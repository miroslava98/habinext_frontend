import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const UserProfileCard = ({ nombre, correo, imagenPerfil, onEdit }: any) => {
    return (
        <View style={styles.card}>
            <View style={styles.dataContainer}>
                <Image
                    source={
                        imagenPerfil
                            ? { uri: imagenPerfil }
                            : require("@/assets/images/react-logo.png") // o un avatar por defecto
                    }
                    style={styles.avatar}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{nombre}</Text>
                    <Text style={styles.email}>{correo}</Text>
                </View>

            </View>
            <TouchableOpacity style={styles.button} onPress={onEdit}>
                <Text style={styles.buttonText}>Editar perfil</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#c8d1ba", // fondo principal
        padding: 20,
        borderColor:'black', // borde blanco
        borderRadius: 10,
        marginVertical: 20,
        marginHorizontal: 16,
        elevation: 4,
    },
    dataContainer: {
        display:'flex',
        flexDirection: 'row',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#FFFFFF", // borde blanco
        marginBottom: 10,
    },
    textContainer: {
        flexDirection: 'column',
        alignSelf: 'center',
        marginLeft:10

    },
    name: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 5,
    },
    email: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    button: {
        width: '100%',
        backgroundColor: "#5E6E5E",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        textAlign: 'center'
    },

});

export default UserProfileCard;
