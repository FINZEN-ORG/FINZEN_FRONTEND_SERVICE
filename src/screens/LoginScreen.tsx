import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const { handleGoogleLogin } = useAuth();

  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      <Image
        source={require("../assets/logo.png")}
        className="w-32 h-32 mb-8"
        resizeMode="contain"
      />
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Bienvenido a FinZen 🎉
      </Text>
      <Text className="text-gray-600 mb-8 text-center">
        Administra tus finanzas de manera sencilla y segura
      </Text>

      <TouchableOpacity
        onPress={handleGoogleLogin}
        className="flex-row items-center bg-red-500 px-6 py-3 rounded-full shadow-lg"
      >
        <Image
          source={require("../assets/google.png")}
          className="w-6 h-6 mr-3"
        />
        <Text className="text-white font-medium text-lg">
          Iniciar sesión con Google
        </Text>
      </TouchableOpacity>
    </View>
  );
}