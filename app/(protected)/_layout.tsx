import { useAuth } from "@/src/context/authcontext";
import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

export default function ProtectedLayout() {
  const { userToken, loading } = useAuth();

  useEffect(() => {
    if (!loading && !userToken) {
      router.replace('/(modals)/login'); // mejor que navigate
    }
  }, [loading, userToken]);

  // ⚠️ Bloquea completamente mientras loading o no hay token
  if (loading || !userToken) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack />;
}
