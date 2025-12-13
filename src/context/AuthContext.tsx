import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService, { User } from '../services/AuthService';

// Types for the context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  onboardingCompleted: boolean;
  setOnboardingCompleted: (completed: boolean) => Promise<void>;
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
  const [onboardingCompleted, setOnboardingCompletedState] = useState<boolean>(false);

  // Clave para persistir la bandera
  const ONBOARDING_KEY = '@finzen_onboarding_completed';

  // Initialize authentication status
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      AuthService.configureGoogleSignIn();
      const userData = await AuthService.checkAuthStatus();
      const storedToken = await AuthService.getToken();
      const onboardingFlag = await AsyncStorage.getItem(ONBOARDING_KEY);
      setOnboardingCompletedState(onboardingFlag === 'true');
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
      const sessionId = String(userData.id || userData.email || Date.now());
      const userId = String(userData.id || '0');
      await AsyncStorage.setItem('@finzen_user_session_id', sessionId);
      await AsyncStorage.setItem('@finzen_user_id', userId);
      // Si es la primera vez, inicializar la bandera de onboardingCompleted en false
      const onboardingFlag = await AsyncStorage.getItem(ONBOARDING_KEY);
      if (onboardingFlag === null) {
        await AsyncStorage.setItem(ONBOARDING_KEY, 'false');
        setOnboardingCompletedState(false);
      } else {
        setOnboardingCompletedState(onboardingFlag === 'true');
      }
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
      setOnboardingCompletedState(false);
      // Limpiar datos de sesión
      await AsyncStorage.removeItem('@finzen_motivational_message');
      await AsyncStorage.removeItem('@finzen_user_session_id');
      await AsyncStorage.removeItem('@finzen_user_id');
      await AsyncStorage.removeItem(ONBOARDING_KEY);
    } catch (error) {
      console.error('Error during logout:', error);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Función para actualizar la bandera y persistirla
  const setOnboardingCompleted = useCallback(async (completed: boolean) => {
    setOnboardingCompletedState(completed);
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, completed ? 'true' : 'false');
    } catch (e) {
      // ignore
    }
  }, []);

  const value = useMemo(() => {
    const v: any = {
      user,
      isLoading,
      isAuthenticated,
      onboardingCompleted,
      setOnboardingCompleted,
      login,
      logout,
      checkAuthStatus,
    };
    v.token = token;
    return v as AuthContextType;
  }, [user, isLoading, isAuthenticated, onboardingCompleted, setOnboardingCompleted, login, logout, checkAuthStatus, token]);

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