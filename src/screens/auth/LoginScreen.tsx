import { loginStyles as styles } from './LoginScreen.Style';
import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoFinZen from '../../assets/images/finzen-NoBackground.png';
import { useAuthActions } from '../../hooks/useAuthActions';
import { useAuth } from '../../context/AuthContext';
import {globalStyles} from '../../styles/index';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const { handleGoogleLogin } = useAuthActions();
  const { /* user, */ /* isLoading, */ /* isAuthenticated, */ login } = useAuth();
  const navigation = useNavigation();
  // token is injected into context value as any.token in AuthContext
  const token = (login as any)?.token ?? (useAuth as any)?.token;

  const devTokenStyle = { marginTop: 8, fontSize: 12, color: '#444' } as const;

  const onGoogleLogin = async () => {
    try {
      await handleGoogleLogin();
    } catch (error) {
      // Error is already handled in useAuthActions
    }
  };

  return (
    <View style={globalStyles.screenContainer}>
      <View style={styles.imageContainer}>
        <Image source={LogoFinZen} style={styles.logo} />
      </View>
      <Text style={globalStyles.title}>Bienvenido a FinZen</Text>
      {/* Mostrar token completo solo en desarrollo */}
      {__DEV__ && token && (
        <Text style={devTokenStyle} selectable>
          {`TOKEN: ${token}`}
        </Text>
      )}
      <TouchableOpacity style={styles.googleButton} onPress={onGoogleLogin}>
        <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.googleButton, { marginTop: 12, backgroundColor: '#E6F9EE' }]}
        onPress={() => {
          try {
            // navigate to Onboarding -> Welcome
            (navigation as any).navigate('Onboarding', { screen: 'Welcome' });
          } catch (e) {
            console.warn('Navigation to Onboarding failed', e);
          }
        }}
      >
        <Text style={[styles.googleButtonText, { color: '#00481c' }]}>Conocer al usuario</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;