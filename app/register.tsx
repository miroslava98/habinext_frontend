import api from "@/src/services/api";
import { Input, Button, Divider } from "@rneui/base";
import { router, useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";




export default function Register() {

    const router = useRouter();

    const [nombre, setNombre] = React.useState('');
    const [correo, setCorreo] = React.useState('');
    const [contrasenya, setContrasenya] = React.useState('');
    const [error, setError] = React.useState('');


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



        <View style={styles.container}>
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

                <TextInput
                    style={styles.input}
                    secureTextEntry
                    onChangeText={setContrasenya}
                    value={contrasenya}
                    placeholder="Contraseña"
                    keyboardType="visible-password" />




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
                    onPress={() => { router.push("/login") }}>
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

    }




});