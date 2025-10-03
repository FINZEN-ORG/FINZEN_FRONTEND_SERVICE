import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppStackParamList } from "../types";

import TabNavigator from "../components/TabNavigator/TabNavigator";
import AddExpenseScreen from "../screens/expenses/AddExpenseScreen";
import AddIncomeScreen from "../screens/income/AddIncomeScreen";

const Stack = createStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: false, 
        gestureEnabled: false 
      }}
    >
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      <Stack.Screen name="AddIncome" component={AddIncomeScreen} />
      
      {/* Futuras pantallas que necesiten stack navigation */}
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
}