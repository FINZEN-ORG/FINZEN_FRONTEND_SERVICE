import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import SplashScreen from './src/screens/home/SplashScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import Dashboard from './src/screens/dashboard/Dashboard';
import AuthService from './src/services/AuthService';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Configure Google Sign-In
    AuthService.configureGoogleSignIn();

    const checkLogin = async () => {
      try {
        const userData = await AuthService.checkAuthStatus();
        if (userData) {
          setUser(userData);
          console.log("Usuario logueado:", userData);
        }
      } catch (error) {
        console.log("Error checking auth status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#e9efe9ff' }}>
        <ActivityIndicator size="large" color="#37706b" />
      </View>
    );
  }

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return <LoginScreen onLogin={handleLogin} />;
}