import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Overlay, ListItem } from '@rneui/base';
import { router } from 'expo-router';
import { useAuth } from '@/src/context/authcontext';

const { width } = Dimensions.get('window');

const ProfileMenuButton = ({ visible, onClose }: any) => {
  const { logout } = useAuth();

  const handleProfile = () => {
    onClose();
    router.push('/(protected)/profile');
  };

  async function handleLogout() {
    onClose();
    await logout();
    router.push('/(modals)/login');
  }

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={onClose}
      overlayStyle={styles.overlay}
      animationType="fade"
      fullScreen={false}
    >
      <View style={styles.container}>
        <ListItem onPress={handleProfile} containerStyle={styles.listItem} bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>Ver perfil</ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <ListItem onPress={handleLogout} containerStyle={[styles.listItem, styles.logoutItem]}>
          <ListItem.Content>
            <ListItem.Title style={[styles.title, styles.logoutTitle]}>Cerrar sesión</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 50,          // Altura desde arriba (ajusta según tu header)
    right: 10,        // Separación del borde derecho
    width: 180,
    padding: 0,
    borderRadius: 8,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 15,
    color: '#333',
  },
  logoutItem: {
    backgroundColor: 'white',
  },
  logoutTitle: {
    color: '#a71d2a',
    fontWeight: 'bold',
  },
});

export default ProfileMenuButton;
