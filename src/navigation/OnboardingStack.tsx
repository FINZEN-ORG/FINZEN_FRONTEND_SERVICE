import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingWelcome from '../screens/onboarding/OnboardingWelcome';
import OnboardingQuestions from '../screens/onboarding/OnboardingQuestions';
import OnboardingSummary from '../screens/onboarding/OnboardingSummary';
import OnboardingFinancialSituation from '../screens/onboarding/OnboardingFinancialSituation';
import OnboardingLifestyle from '../screens/onboarding/OnboardingLifestyle';

const Stack = createStackNavigator();

export default function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={OnboardingWelcome} />
      <Stack.Screen name="Questions" component={OnboardingQuestions} />
      <Stack.Screen name="FinancialSituation" component={OnboardingFinancialSituation} />
      <Stack.Screen name="Lifestyle" component={OnboardingLifestyle} />
      <Stack.Screen name="Summary" component={OnboardingSummary} />
    </Stack.Navigator>
  );
}
