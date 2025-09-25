import React, { useEffect } from 'react';
import { Button, View, Text, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "436116978721-9ch9qg5j8o62mj6v4aqtqlgccmir8e2g.apps.googleusercontent.com",
      scopes: ['profile', 'email', 'openid'],
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // El idToken está dentro de userInfo.data
      const idToken = userInfo.data?.idToken;

      if (!idToken) {
        Alert.alert("Error", "No se obtuvo el idToken de Google");
        return;
      }

      // Enviar idToken al backend Spring Boot
      const response = await axios.post("http://192.168.0.14:8080/api/auth/google", { idToken });

      // Guardar JWT de FinZen
      await AsyncStorage.setItem("jwt", response.data.accessToken);

      console.log("JWT recibido:", response.data.accessToken);
      Alert.alert("Login exitoso ✅");

    } catch (error: any) {
      console.error("Error en login:", error);
      Alert.alert("Error en login", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bienvenido a FinZen</Text>
      <Button title="Iniciar sesión con Google" onPress={handleGoogleLogin} />
    </View>
  );
}