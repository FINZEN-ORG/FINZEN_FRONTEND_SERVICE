// Types for authentication stack (non-authenticated screens)
export type AuthStackParamList = {
  Login: undefined;
  Onboarding?: undefined;
  // Futuras pantallas de autenticación
  // Register: undefined;
  // ForgotPassword: undefined;
};

// Types for app stack (authenticated screens)
export type AppStackParamList = {
  Main: undefined; // TabNavigator principal
  Goals: undefined;
  Coach: undefined;
  Budget: undefined;
  Reports: undefined;
  NewCategory: undefined;
  // Pantallas adicionales que necesiten stack navigation
  AddExpense: undefined;
  AddIncome: undefined;
  // Futuras pantallas autenticadas
  // Profile: undefined;
  // Settings: undefined;
  // TransactionDetail: { transactionId: string };
};

// Combined type for type checking and legacy compatibility
export type RootStackParamList = AuthStackParamList & AppStackParamList;
