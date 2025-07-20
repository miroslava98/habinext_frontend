import api from "@/src/services/api";
import { Ionicons } from "@expo/vector-icons";
import { Input, Button, Divider } from "@rneui/base";
import { router, useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions } from "react-native";




export default function Register() {

    const router = useRouter();
    const { width } = useWindowDimensions();

    const isMobileSize = width < 768;



    const [nombre, setNombre] = React.useState('');
    const [correo, setCorreo] = React.useState('');
    const [contrasenya, setContrasenya] = React.useState('');
    const [error, setError] = React.useState('');
    const [mostrarContrasenya, setMostrarContrasenya] = React.useState(false);



    async function registro_usuario() {
        try {
            const response = await api.post('/auth/signup', {
                nombre,
                correo,
                contrasenya

            });

            router.push('/');

        } catch (error: any) {
            const mensaje = error.response.data.descripcion || 'Error desconocido';
            setError(mensaje);
            alert(error.response.data.descripcion)

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


            <Text style={{
                fontSize: 25,
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: 25,

            }}>
                Crea tu cuenta</Text>
            <Text style={{
                fontSize: 15,
                marginInlineStart: 30,
                textAlign: 'left',
                fontWeight: '400',
                padding: isMobileSize ? 'auto' : 20

            }}>
                Comprueba que el correo está bien escrito.
                Este correo estará asociado a tu cuenta y
                no podrás modificarlo.</Text>
            <View style={styles.form}>
                <TextInput
                    placeholder="Correo"
                    style={styles.input}
                    onChangeText={setCorreo}
                    value={correo} />
                <TextInput
                    placeholder="Nombre"
                    style={styles.input}
                    onChangeText={setNombre}
                    value={nombre} />

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




            </View>
            <Button
                title="Crear mi cuenta"
                buttonStyle={{ width: '90%', alignSelf: 'center', backgroundColor: '#3C4B3C', marginTop: 20, borderRadius: 10 }}
                onPress={registro_usuario}>

            </Button>
            <Text style={{ color: 'red', marginTop: 10, alignSelf: 'center' }}>{error}</Text>

            <View style={styles.bottom}>
                <Text style={{ fontSize: 15 }}>Ya tienes cuenta?</Text>
                <TouchableOpacity
                    onPress={() => { router.push("/(modals)/login") }}>
                    <Text style={{ color: '#3C4B3C', fontWeight: 'bold', fontSize: 15 }}>Accede aquí</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: '#C2D1C2',
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
        right: 40,
        top: 21,
    },




});