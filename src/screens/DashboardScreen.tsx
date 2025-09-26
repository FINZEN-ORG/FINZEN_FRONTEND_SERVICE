import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function DashboardScreen() {
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <Text className="text-2xl font-bold mb-2">
        Hola, {user?.name || "Usuario"} 👋
      </Text>
      <Text className="text-gray-600 mb-6">{user?.email}</Text>

      {/* Aquí podrían ir cards, estadísticas o gráficas */}
      <View className="bg-white p-4 rounded-2xl shadow mb-4">
        <Text className="text-lg font-semibold">Balance General</Text>
        <Text className="text-2xl font-bold text-green-600 mt-2">$100,000</Text>
      </View>
    </View>
  );
}