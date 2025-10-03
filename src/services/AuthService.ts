import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { API_BASE_URL, GOOGLE_WEB_CLIENT_ID } from '@env';

export interface User {
  id: string;
  name: string;
  email: string;
  // Add more user properties as needed
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

class AuthService {
  // Configure Google Sign In
  static configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      scopes: ['profile', 'email', 'openid'],
      offlineAccess: false, // We don't need offline access
      hostedDomain: '', // No specific domain
      forceCodeForRefreshToken: true, // Force refresh token
    });
  }

  // Login with Google
  static async loginWithGoogle(): Promise<User> {
    try {
      // Check if device supports Google Play Services
      await GoogleSignin.hasPlayServices();
      
      // Try to get current user to check if already signed in
      try {
        const currentUser = await GoogleSignin.getCurrentUser();
        if (currentUser) {
          await GoogleSignin.signOut();
        }
      } catch (error) {
        // No user currently signed in
      }
      
      // Get user info from Google
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;

      if (!idToken) {
        throw new Error('No se obtuvo el idToken de Google');
      }

      // Send idToken to backend
      const response = await axios.post(`${API_BASE_URL}/auth/google`, { 
        idToken 
      });

      const jwt = response.data.accessToken;
      
      // Save JWT token
      await AsyncStorage.setItem("jwt", jwt);
      
      // Get user data from backend
      const userData = await this.getCurrentUser();
      
      return userData;
    } catch (error: any) {
      console.error("Error en Google login:", error);
      throw new Error(error.message || 'Error en el login con Google');
    }
  }

  // Complete login flow with Google (for use with AuthContext)
  static async performGoogleLogin(): Promise<User> {
    return await this.loginWithGoogle();
  }

  // Get current user data
  static async getCurrentUser(): Promise<User> {
    try {
      const token = await AsyncStorage.getItem("jwt");
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(`${API_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error: any) {
      console.error("Error getting current user:", error);
      // If token is invalid, remove it
      if (error.response?.status === 401) {
        await this.logout();
      }
      throw new Error('Error al obtener datos del usuario');
    }
  }

  // Check if user is logged in and return user data
  static async checkAuthStatus(): Promise<User | null> {
    try {
      const token = await AsyncStorage.getItem("jwt");
      
      if (!token) {
        return null;
      }

      const userData = await this.getCurrentUser();
      return userData;
    } catch (error) {
      console.log("Auth check failed, user not logged in");
      return null;
    }
  }

  // Logout user
  static async logout(): Promise<void> {
    try {
      // Remove JWT token first
      await AsyncStorage.removeItem("jwt");
      
      // Sign out from Google
      try {
        await GoogleSignin.revokeAccess();
      } catch (revokeError) {
        console.log("Warning: Could not revoke Google access");
      }
      
      try {
        await GoogleSignin.signOut();
      } catch (signOutError) {
        console.log("Warning: Could not sign out from Google");
      }
      
    } catch (error) {
      console.error("Error during logout:", error);
      // Even if Google signout fails, remove the token
      await AsyncStorage.removeItem("jwt");
    }
  }

  // Get stored JWT token
  static async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem("jwt");
  }
}

export default AuthService;