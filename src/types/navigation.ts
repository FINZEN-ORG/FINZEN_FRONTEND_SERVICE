// Types for authentication stack (non-authenticated screens)
export type AuthStackParamList = {
  Login: undefined;
};

export type AppStackParamList = {
  Main: undefined;
  Goals: undefined;
  Coach: undefined;
  Budget: undefined;
  Reports: undefined;
  NewCategory: undefined;
  AddExpense: undefined;
  AddIncome: undefined;
};

export type RootStackParamList = AuthStackParamList & AppStackParamList;
