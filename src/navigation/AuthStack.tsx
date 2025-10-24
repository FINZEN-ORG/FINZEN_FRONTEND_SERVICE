import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackParamList } from "../types";

import LoginScreen from "../screens/auth/LoginScreen";

let OnboardingStack: any;
try {
  OnboardingStack = require('./OnboardingStack').default;
} catch (e) {
  OnboardingStack = undefined;
}

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ 
        headerShown: false, 
        gestureEnabled: false 
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      {OnboardingStack && <Stack.Screen name="Onboarding" component={OnboardingStack} />}
    </Stack.Navigator>
  );
}
