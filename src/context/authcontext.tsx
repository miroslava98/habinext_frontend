import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { router } from 'expo-router';


interface JwtPayload {
    exp: number;
}


interface AuthContextType {
    userToken: string | null;
    loading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    isTokenValid: (token:string) => boolean;
}

export const AuthContext = createContext<AuthContextType>({
    userToken: null,
    loading: true,
    login: async () => { },
    logout: async () => { },
    isTokenValid: () => false,
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


    // Función para validar token JWT localmente
    const isTokenValid = (token: string): boolean => {
        if (!token) return false;
        try {
            const { exp } = jwtDecode<JwtPayload>(token);
            return exp > Date.now() / 1000;
        } catch {
            return false;
        }
    };

    const loadToken = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token && isTokenValid(token)) {
                setUserToken(token);
            } else {
                await AsyncStorage.removeItem('authToken');
                setUserToken(null);
               // router.push("/");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadToken();
    }, []);

    const login = async (token: string) => {
        await AsyncStorage.setItem('authToken', token);
        setUserToken(token);
    }

    const logout = async () => {
        if (!userToken || !isTokenValid(userToken)) {
            throw new Error("Token inválido o expirado");
          }
        await AsyncStorage.removeItem('authToken');
        setUserToken(null);
    };

    return (
        <AuthContext.Provider value={{ userToken, loading, login, logout, isTokenValid }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);