import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
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
  const login = (userData: User, newToken?: string | null) => {
    setUser(userData);
    setIsAuthenticated(true);
    if (newToken !== undefined) {
      setToken(newToken);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      await AuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setToken(null);
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if logout fails, clear local state
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    checkAuthStatus,
  };

  // Include token in the provided value by casting to any to avoid changing the exported type shape
  // (we updated the AuthContextType above to include token in login signature but not as top-level field)
  (value as any).token = token;

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

// Export the context for advanced usage if needed
export { AuthContext };