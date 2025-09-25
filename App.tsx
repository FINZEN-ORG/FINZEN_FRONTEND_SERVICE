import React, { useEffect, useState } from 'react';
import { Button, View, Text, Alert, ActivityIndicator } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "436116978721-9ch9qg5j8o62mj6v4aqtqlgccmir8e2g.apps.googleusercontent.com",
      scopes: ['profile', 'email', 'openid'],
    });

    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("jwt");
      if (token) {
        try {
          const response = await axios.get("http://192.168.0.14:8080/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          console.log("Usuario logueado:", response.data);
        } catch (error) {
          console.log("JWT inválido, limpiando...");
          await AsyncStorage.removeItem("jwt");
        }
      }
      setLoading(false);
    };

    checkLogin();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const idToken = userInfo.data?.idToken;
      if (!idToken) {
        Alert.alert("Error", "No se obtuvo el idToken de Google");
        return;
      }
      console.log("Google idToken:", idToken);
      const response = await axios.post("http://192.168.0.14:8080/api/auth/google", { idToken });

      const jwt = response.data.accessToken;
      await AsyncStorage.setItem("jwt", jwt);
      console.log("JWT GENERADO POR NUESTRO BACKEND:", jwt);
      const meResponse = await axios.get("http://192.168.0.14:8080/api/users/me", {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      setUser(meResponse.data);
      console.log("Login exitoso, usuario:", meResponse.data);
      Alert.alert("Login exitoso ✅");

    } catch (error: any) {
      console.error("Error en login:", error);
      Alert.alert("Error en login", error.message);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Bienvenido a FinZen 🎉</Text>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bienvenido a FinZen</Text>
      <Button title="Iniciar sesión con Google" onPress={handleGoogleLogin} />
    </View>
  );
}