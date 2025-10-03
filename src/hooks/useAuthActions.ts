import { useAuth } from '../context/AuthContext';
import AuthService from '../services/AuthService';
import { Alert } from 'react-native';

export const useAuthActions = () => {
  const { login, logout } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const userData = await AuthService.loginWithGoogle();

      // Imprimir token del usuario en consola (MOSTRAR COMPLETO SOLO EN DESARROLLO)
      const storedToken = await AuthService.getToken();
      if (__DEV__) {
        // Mostrar el token completo sin truncar
        console.log('🔐 FULL JWT TOKEN:', storedToken);

        // Intentar mostrar la respuesta completa del login de forma segura
        try {
          console.log('🔐 LOGIN RESPONSE (full):', JSON.stringify({ userData, token: storedToken }, null, 2));
        } catch (err) {
          // Si stringify falla (por ejemplo, circular refs), mostrar raw
          console.log('🔐 LOGIN RESPONSE (raw):', { userData, token: storedToken });
        }
      } else {
        // En producción mostrar solo indicador y longitud (por seguridad)
        console.log('🔐 JWT TOKEN LENGTH:', storedToken ? storedToken.length : 0);
      }

  // Obtener token almacenado y pasarlo al contexto para poder mostrarlo en UI si es necesario
  const token = storedToken ?? await AuthService.getToken();
  login(userData, token);
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