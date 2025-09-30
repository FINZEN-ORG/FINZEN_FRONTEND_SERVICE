import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

import SplashScreen from "../screens/home/SplashScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import Dashboard from "../screens/dashboard/Dashboard";
import AuthService from "../services/AuthService";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    AuthService.configureGoogleSignIn();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen name="Splash">
          {(props) => (
            <SplashScreen
              {...props}
              onFinish={async () => {
                try {
                  const userData = await AuthService.checkAuthStatus();
                  if (userData) {
                    setUser(userData);
                    props.navigation.reset({
                      index: 0,
                      routes: [{ name: "Dashboard", params: { user: userData } }],
                    });
                  } else {
                    props.navigation.reset({
                      index: 0,
                      routes: [{ name: "Login" }],
                    });
                  }
                } catch (e) {
                  console.log("Error checking auth status:", e);
                  props.navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                  });
                }
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Login">
            {(props) => (
                <LoginScreen
                {...props}
                onLogin={(userData: any) => {
                    setUser(userData);
                    props.navigation.reset({
                    index: 0,
                    routes: [{ name: "Dashboard", params: { user: userData } }],
                    });
                }}
            />
        )}
        </Stack.Screen>


        <Stack.Screen name="Dashboard">
          {(props) => {
            const userFromRoute = props.route.params?.user || user;
            return (
              <Dashboard
                {...props}
                user={userFromRoute}
                onLogout={() => {
                  setUser(null);
                  props.navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                  });
                }}
              />
            );
          }}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
