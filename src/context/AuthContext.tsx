import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService, { User } from '../services/AuthService';

// Types for the context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: User, token?: string | null) => void;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider props interface
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Initialize authentication status
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      // Configure Google Sign In
      AuthService.configureGoogleSignIn();

      // Check if user is already authenticated
      const userData = await AuthService.checkAuthStatus();
      const storedToken = await AuthService.getToken();

      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        setToken(storedToken);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setToken(null);
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Check authentication status
  const checkAuthStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const userData = await AuthService.checkAuthStatus();
      const storedToken = await AuthService.getToken();

      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        setToken(storedToken);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setToken(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = useCallback(async (userData: User, newToken?: string | null) => {
    setUser(userData);
    setIsAuthenticated(true);
    if (newToken !== undefined) {
      setToken(newToken);
    }

    // Guardar sessionId y userId de forma segura (como Strings)
    try {
      // FIX: Asegurar que convertimos a String para evitar error java.lang.Double
      const sessionId = String(userData.id || userData.email || Date.now());
      const userId = String(userData.id || '0');

      await AsyncStorage.setItem('@finzen_user_session_id', sessionId);
      await AsyncStorage.setItem('@finzen_user_id', userId);

    } catch (error) {
      console.error('Error saving session details:', error);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await AuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setToken(null);

      // Limpiar datos de sesión
      await AsyncStorage.removeItem('@finzen_motivational_message');
      await AsyncStorage.removeItem('@finzen_user_session_id');
      await AsyncStorage.removeItem('@finzen_user_id');
    } catch (error) {
      console.error('Error during logout:', error);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(() => {
    const v: any = {
      user,
      isLoading,
      isAuthenticated,
      login,
      logout,
      checkAuthStatus,
    };
    v.token = token;
    return v as AuthContextType;
  }, [user, isLoading, isAuthenticated, login, logout, checkAuthStatus, token]);

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };