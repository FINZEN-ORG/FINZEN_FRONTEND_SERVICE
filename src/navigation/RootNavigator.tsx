import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import OnboardingStack from "./OnboardingStack";
import SplashScreen from "../screens/home/SplashScreen";

export default function RootNavigator() {
  const { isAuthenticated, isLoading, onboardingCompleted } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (isLoading) {
    return null; // O un spinner simple
  }

  return (
      <NavigationContainer>
        {!isAuthenticated ? (
            // 1. Si NO está autenticado -> Login
            <AuthStack />
        ) : !onboardingCompleted ? (
            // 2. Si está autenticado PERO NO ha hecho onboarding -> Onboarding
            <OnboardingStack />
        ) : (
            // 3. Si todo está listo -> App Principal
            <AppStack />
        )}
      </NavigationContainer>
  );
}