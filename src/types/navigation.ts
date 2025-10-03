// Types for authentication stack (non-authenticated screens)
export type AuthStackParamList = {
  Login: undefined;
  // Futuras pantallas de autenticación
  // Register: undefined;
  // ForgotPassword: undefined;
};

// Types for app stack (authenticated screens)
export type AppStackParamList = {
  Dashboard: undefined;
  // Futuras pantallas autenticadas
  // Profile: undefined;
  // Settings: undefined;
  // Transactions: undefined;
};

// Combined type for type checking and legacy compatibility
export type RootStackParamList = AuthStackParamList & AppStackParamList;
