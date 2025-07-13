import { Slot, Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../src/context/authcontext";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import login from "./login";

export default function RootLayout() {

  const { userToken, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!userToken) {
        router.replace("/login");
      }
    }
  }, [loading, userToken]);

  if (loading) {
    return (
      <AuthProvider>
        <Slot />
      </AuthProvider>
    );
  }

  return <Stack />;
}
