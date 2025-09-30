import { loginStyles as styles } from './LoginScreen.Style';
import React from 'react';
import { TouchableOpacity, View, Text, Alert, Image } from 'react-native';
import LogoFinZen from '../../assets/images/finzen-NoBackground.png';
import AuthService from '../../services/AuthService';

interface LoginScreenProps {
  onLogin: (userData: any) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {

  const handleGoogleLogin = async () => {
    try {
      const userData = await AuthService.loginWithGoogle();
      onLogin(userData);
    } catch (error: any) {
      console.error("Error en login:", error);
      Alert.alert("Error en login", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={LogoFinZen} style={styles.logo} />
      </View>
      <Text style={styles.title}>Bienvenido a FinZen</Text>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;