import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppStackParamList } from "../types";
import TabNavigator from "../components/TabNavigator/TabNavigator";
import AddExpenseScreen from "../screens/expenses/AddExpenseScreen";
import AddIncomeScreen from "../screens/income/AddIncomeScreen";
import NewCategoryScreen from "../screens/categories/NewCategoryScreen";
import NewBudgetScreen from "../screens/budget/NewBudgetScreen";
import BudgetDetailScreen from "../screens/budget/BudgetDetailScreen";
import GoalDetailScreen from "../screens/goals/GoalDetailScreen";

const Stack = createStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: false, 
        gestureEnabled: false 
      }}
    >
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      <Stack.Screen name="AddIncome" component={AddIncomeScreen} />
      <Stack.Screen name="NewCategory" component={NewCategoryScreen} />
      <Stack.Screen name="NewBudget" component={NewBudgetScreen} />
      <Stack.Screen name="BudgetDetail" component={BudgetDetailScreen} />
      <Stack.Screen name="GoalDetail" component={GoalDetailScreen} />
      {/* Futuras pantallas que necesiten stack navigation */}
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
}