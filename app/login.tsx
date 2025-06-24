import { Input, Button, Divider } from "@rneui/base";
import { router, useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";




export default function Login() {

    const router = useRouter();


    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (

        <View style={styles.container}>
            <TextInput
                placeholder="Introduce tu correo"
                style={styles.input}
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                placeholder="Contraseña"
                keyboardType="visible-password"
            />

            <Button
                title="Acceder"
                buttonStyle={{ width: '80%', alignSelf: 'center', backgroundColor: '#3C4B3C', marginTop: 20 }}
                onPress={() => router.push("/")}></Button>


        </View>
    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#C2D1C2'
    },
    input: {
        width: 350,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        alignSelf: 'center',
        backgroundColor:'white',
        borderBottomColor: 'white',
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white'
    },




});