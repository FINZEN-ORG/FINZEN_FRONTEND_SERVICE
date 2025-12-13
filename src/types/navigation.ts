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
  Main: undefined;
  Goals: undefined;
  Coach: undefined;
  Budget: undefined;
  Reports: undefined;
  NewCategory: undefined;
  AddExpense: undefined;
  AddIncome: undefined;
  NewBudget: undefined;
  BudgetDetail: undefined;
  GoalDetail: { goalId: number };
  Settings: undefined;
  // Futuras pantallas autenticadas
  // Profile: undefined;
  // TransactionDetail: { transactionId: string };
};

// Combined type for type checking and legacy compatibility
export type RootStackParamList = AuthStackParamList & AppStackParamList;
