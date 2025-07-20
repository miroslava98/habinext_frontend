import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


type EditProfileModalProps = {
    visible: boolean;
    imagenPerfil: string;
    correo: string;
    nombre: string;
    onClose: () => void;
    onSave: (newNombre: string, newContrasenya: string) => void;
};

const EditProfileModal = ({
    visible,
    imagenPerfil,
    correo,
    nombre,
    onClose,
    onSave,
}: EditProfileModalProps) => {
    const [newNombre, setNewNombre] = React.useState(nombre);
    const [newContrasenya, setnewContrasenya] = React.useState('');
    const [mostrarContrasenya, setMostrarContrasenya] = React.useState(false);

    // Actualiza valores cuando el modal se abre con nuevos datos
    React.useEffect(() => {
        setNewNombre(nombre);
    }, [nombre, visible]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Editar Perfil</Text>


                    <Image
                        source={
                            imagenPerfil
                                ? { uri: imagenPerfil }
                                : require("@/assets/images/react-logo.png") // o un avatar por defecto
                        }
                        style={styles.avatar}
                    />

                    <TextInput
                        style={styles.input}
                        value={correo}
                        aria-disabled
                    />
                    <View style={{ position: 'relative' }}>
                        <TextInput
                            style={styles.input}
                            value={newContrasenya}
                            onChangeText={setnewContrasenya}
                            placeholder="Nueva contraseña"
                            keyboardType="visible-password"
                            secureTextEntry={!mostrarContrasenya}
                        />
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
                    <TextInput
                        style={styles.input}
                        value={newNombre}
                        onChangeText={setNewNombre}
                        placeholder="Nombre"
                    />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                            onPress={onClose}
                        >
                            <Text>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: '#3C4B3C' }]}
                            onPress={() => onSave(newNombre, newContrasenya)}
                        >
                            <Text style={{ color: '#fff' }}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default EditProfileModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    avatar: {
        alignSelf: 'center',
        borderRadius: 50,
        borderWidth: 2,
        marginBottom: 10,

    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    toggleButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },

});
