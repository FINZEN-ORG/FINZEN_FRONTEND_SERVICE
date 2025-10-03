import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppStackParamList } from "../types";

import Dashboard from "../screens/dashboard/Dashboard";

const Stack = createStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ 
        headerShown: false, 
        gestureEnabled: false 
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      
      {/* Futuras pantallas autenticadas */}
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
  );
}