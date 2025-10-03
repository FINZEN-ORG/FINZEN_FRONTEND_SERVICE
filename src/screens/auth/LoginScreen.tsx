import { loginStyles as styles } from './LoginScreen.Style';
import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import LogoFinZen from '../../assets/images/finzen-NoBackground.png';
import { useAuthActions } from '../../hooks/useAuthActions';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const { handleGoogleLogin } = useAuthActions();

  const onGoogleLogin = async () => {
    try {
      await handleGoogleLogin();
    } catch (error) {
      // Error is already handled in useAuthActions
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={LogoFinZen} style={styles.logo} />
      </View>
      <Text style={styles.title}>Bienvenido a FinZen</Text>
      <TouchableOpacity style={styles.googleButton} onPress={onGoogleLogin}>
        <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;