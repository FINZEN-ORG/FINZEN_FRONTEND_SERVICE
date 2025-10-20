import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import SplashScreen from "../screens/home/SplashScreen";

export default function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  // Mostrar Splash hasta que la animación termine
  if (showSplash) {
    return (
      <SplashScreen
        onFinish={() => {
          console.log("SplashScreen animation finished");
          setShowSplash(false);
        }}
      />
    );
  }

  // Después del splash, mostrar loading si aún está verificando auth
  if (isLoading) {
    // Podrías mostrar un simple loading aquí si quieres
    return null;
  }

  // Mostrar la navegación apropiada basada en autenticación
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}