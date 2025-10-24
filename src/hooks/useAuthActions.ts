import { useAuth } from '../context/AuthContext';
import AuthService from '../services/AuthService';
import { Alert } from 'react-native';

export const useAuthActions = () => {
  const { login, logout } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const userData = await AuthService.loginWithGoogle();
      login(userData);
      return userData;
    } catch (error: any) {
      console.error("Error en login:", error);
      Alert.alert("Error en login", error.message);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.error("Error en logout:", error);
      Alert.alert("Error", "No se pudo cerrar sesión");
      throw error;
    }
  };

  return {
    handleGoogleLogin,
    handleLogout,
  };
};

export default useAuthActions;