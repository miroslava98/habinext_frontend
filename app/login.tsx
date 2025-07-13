import api from "@/src/services/api";
import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Button, Icon } from "@rneui/base";
import { useAuth } from "@/src/context/authcontext";


export default function Login() {

    const { login } = useAuth();
    const router = useRouter();


    const [isLoading, setIsLoading] = React.useState(false);
    const [correo, setCorreo] = React.useState('');
    const [contrasenya, setContrasenya] = React.useState('');
    const [error, setError] = React.useState('');


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

        <View style={styles.container}>
            <TouchableOpacity onPress={() =>router.push("/")}>
                <Icon type="feather" name="x" style={{ paddingBottom: 50, marginEnd: 10, alignItems: 'flex-end' }}></Icon>
            </TouchableOpacity>
            <View style={styles.form}>
                <TextInput
                    placeholder="Correo"
                    style={styles.input}
                    onChangeText={setCorreo}
                    value={correo} />
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    onChangeText={setContrasenya}
                    value={contrasenya}
                    placeholder="Contraseña"
                    keyboardType="visible-password" />

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
                    onPress={() => { router.push("/register") }}>
                    <Text style={{ color: '#3C4B3C', fontWeight: 'bold', fontSize: 15 }} >Registro aquí</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 10,
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