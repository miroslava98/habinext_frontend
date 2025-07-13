// components/ProfileMenuButton.js
import React from 'react';
import { View } from 'react-native';
import { Overlay, ListItem } from '@rneui/base';
import { router } from 'expo-router';

const ProfileMenuButton = ({ visible, onClose }: any) => {
  const handleProfile = () => {
    onClose();
    router.push('/profile');
  };

  const handleLogout = () => {
    onClose();
    router.replace('/login');
  };

  return (
    <Overlay isVisible={visible} onBackdropPress={onClose}>
      <View>
        <ListItem onPress={handleProfile}>
          <ListItem.Content>
            <ListItem.Title>Ver perfil</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem onPress={handleLogout}>
          <ListItem.Content>
            <ListItem.Title>Cerrar sesión</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </Overlay>
  );
};

export default ProfileMenuButton;
