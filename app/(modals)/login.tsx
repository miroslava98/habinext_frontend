import api from "@/src/services/api";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, useWindowDimensions, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Button, Icon } from "@rneui/base";
import { AuthContext, useAuth } from "@/src/context/authcontext";
import { Ionicons } from "@expo/vector-icons";
import { jwtDecode, JwtPayload } from "jwt-decode";



export default function Login() {


    const { width } = useWindowDimensions();

    const isMobileSize = width < 768;


    const { login } = useAuth();
    const router = useRouter();


    const [isLoading, setIsLoading] = React.useState(false);
    const [correo, setCorreo] = React.useState('');
    const [contrasenya, setContrasenya] = React.useState('');
    const [error, setError] = React.useState('');
    const [mostrarContrasenya, setMostrarContrasenya] = React.useState(false);



    console.log(correo);
    console.log(contrasenya);


    async function login_usuario() {
        setIsLoading(true);
        try {
            const response =
                await api.post('/auth/login', {
                    correo,
                    contrasenya
                });

            const token = response?.data?.token;
            if (token) {
                await login(token);

            }
            router.replace("/");



        } catch (error: any) {
            const mensaje = error.response?.data?.descripcion || 'Error desconocido';
            setError(mensaje);
            alert(error.response.data.descripcion)
        } finally {
            setIsLoading(false);
        }
    }

    return (


        <View style={[
            styles.container, {
                width: isMobileSize ? 'auto' : 500,
                minHeight: isMobileSize ? 'auto' : 600,
                alignSelf: isMobileSize ? 'auto' : 'center',
                flex: isMobileSize ? 1 : 0,
                marginTop: isMobileSize ? 'auto' : 30
            },
        ]}>

            <TouchableOpacity onPress={() => {
                router.navigate("/");
            }}>
                <Icon
                    type="feather"
                    name="x"
                    style={{
                        paddingBottom: 50,
                        marginEnd: 10,
                        alignItems: 'flex-end'
                    }}></Icon>
            </TouchableOpacity>
            <Text style={{
                fontSize: 25,
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: 25,

            }}>
                Inicia sesión</Text>
            <View style={styles.form}>

                <TextInput
                    id="idCorreo"
                    placeholder="Correo"
                    style={styles.input}
                    onChangeText={setCorreo}
                    value={correo} />


                <View style={{ position: 'relative', width: '100%' }}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={!mostrarContrasenya}
                        onChangeText={setContrasenya}
                        value={contrasenya}
                        placeholder="Contraseña"
                        keyboardType="visible-password" />

                    <TouchableOpacity
                        onPress={() => setMostrarContrasenya(prev => !prev)}
                        style={styles.toggleButton}
                    >
                        <Ionicons
                            type=''
                            name={!mostrarContrasenya ? 'eye-off' : 'eye'}
                            size={20}
                            color="#555"
                        />
                    </TouchableOpacity>
                </View>


                <TouchableOpacity>
                    <Text style={styles.ctr_olvidada}>¿Contraseña olvidada?</Text>
                </TouchableOpacity>


            </View>
            {isLoading && (
                <ActivityIndicator size="large" color="#000" style={{ marginBottom: 10 }} />
            )}

            <Button
                title={isLoading ? "Cargando..." : "Iniciar sesión"}
                onPress={login_usuario}
                disabled={isLoading}
                buttonStyle={{
                    width: '90%',
                    alignSelf: 'center',
                    backgroundColor: '#3C4B3C',
                    borderRadius: 10,
                }}
            />


            <Text style={{ color: 'red', marginTop: 10, alignSelf: 'center' }}>{error}</Text>

            <View style={styles.bottom}>
                <Text style={{ fontSize: 15 }}>¿No tienes cuenta?</Text>
                <TouchableOpacity
                    onPress={() => { router.push("/(modals)/register") }}>
                    <Text style={{ color: '#3C4B3C', fontWeight: 'bold', fontSize: 15 }} >Registro aquí</Text>
                </TouchableOpacity>
            </View>
        </View>



    );
};


const styles = StyleSheet.create({

    container: {
        paddingTop: 20,
        justifyContent: 'flex-start',
        backgroundColor: '#C2D1C2',
        padding: 20


    },
    form: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        width: '90%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        paddingRight: 40,
        borderRadius: 12,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderBottomColor: 'white',
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        textAlign: 'left',
    }, ctr_olvidada: {
        height: 30,
        marginBottom: 30,
        color: 'black',
        alignSelf: 'center',
    },
    bottom: {
        backgroundColor: '#C2D1C2',
        flexDirection: 'row',
        alignSelf: 'center',
        gap: 5,
        marginTop: 10,

    },
    toggleButton: {
        position: 'absolute',
        right: 45,
        top: 21,
    },




});