// app/_layout.tsx
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../src/context/authcontext";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

function RootLayoutInner() {
  const { userToken, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack >
      {/* Pantalla principal */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* Login como modal */}
      <Stack.Screen
        name="(modals)/login"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="(modals)/register"
        options={{ presentation: "modal", headerShown: false }}
      />

    </Stack>
  );
}

// Este es el wrapper con el AuthProvider
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutInner />
    </AuthProvider>
  );
}
