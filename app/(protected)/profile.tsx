import React, { useCallback } from "react";
import PropertyCard from "@/components/PropertyCard";
import { Text, View, StyleSheet, Platform, FlatList, useWindowDimensions, ScrollView } from "react-native";
import { Button } from "@rneui/base";
import HeaderComp from "@/components/HeaderComp";
import UserProfileCard from "@/components/UserProfileCard";
import api from "@/src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import EditProfileModal from "@/components/EditProfileModal";
import { useAuth } from "@/src/context/authcontext";


const miLista = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
];



export default function Perfil() {

    const { isTokenValid } = useAuth();

    const [correo, setCorreo] = React.useState('');
    const [imagenPerfil, setImagenPerfil] = React.useState('');
    const [nombre, setNombre] = React.useState('');
    const [contrasenya, setContrasenya] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);


    async function datosUsuario() {
        const token = await AsyncStorage.getItem('authToken');

        if (!token || !isTokenValid(token)) {
            router.push('/');
            return;
        }

        console.log(token);
        try {
            const response = await api.get('auth/usuario');

            const data = response.data;
            console.log(data);

            setCorreo(data.correo);
            setImagenPerfil(data.imagen_perfil);
            setNombre(data.nombre);
            setContrasenya(data.contrasenya);

        } catch (error: any) {
            const mensaje = error.response?.data?.descripcion || 'Error desconocido';
            alert(error.response.data.descripcion)
        }
    };

    useFocusEffect(
        useCallback(() => {
            datosUsuario();

            return () => {

            };
        }, [])
    );


    const guardarDatos = async (newNombre: string, newContrasenya: string) => {

        

        try {
            await api.put('auth/modificarPerfil', {
                nombre: newNombre,
                contrasenya: newContrasenya,

            });
            setModalVisible(false);
            await datosUsuario();


        } catch (error: any) {
            const mensaje = error.response?.data?.descripcion || 'Error desconocido';
            alert(mensaje);

        }
    }




    const { width } = useWindowDimensions();

    const isMobileSize = width < 768;

    return (
        <><HeaderComp />
            <UserProfileCard
                imagenPerfil={imagenPerfil}
                nombre={nombre}
                correo={correo}
                onEdit={() => {
                    alert('Editar perfil presionado');
                    setModalVisible(true)
                }}

            />

            <EditProfileModal
                visible={modalVisible}
                imagenPerfil={imagenPerfil}
                nombre={nombre}
                correo={correo}
                onClose={() => setModalVisible(false)}
                onSave={guardarDatos}
            >

            </EditProfileModal>
            {Platform.OS === 'web' ? (
                <><Text style={styles.subtitle}>Estás en la versión web 🖥️</Text>

                    <FlatList
                        data={miLista}
                        numColumns={isMobileSize ? 1 : 3}
                        key={isMobileSize ? 'mobile' : 'web'}
                        keyExtractor={item => item.id}
                        renderItem={() => (
                            <View style={styles.item}>
                                <PropertyCard />
                            </View>
                        )}
                        contentContainerStyle={styles.container}
                    >


                    </FlatList>
                </>
            ) : (
                <>
                    <Text style={styles.subtitle}>Estás en la versión móvil 📱</Text>
                    <FlatList
                        data={miLista}
                        numColumns={1}
                        keyExtractor={item => item.id}
                        renderItem={() => (
                            <View style={styles.item}>
                                <PropertyCard />
                            </View>
                        )}
                        contentContainerStyle={styles.container}
                    >


                    </FlatList>
                </>

            )}

            <Button title="Ir a funcionalidades" onPress={() => alert('Vamos allá 🚀')} />
        </>

    );
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
    item: {
        flex: 1,
        margin: 6,

    },
    scrollButtonsContainer: {
        padding: 2,
        paddingVertical: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
