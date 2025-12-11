import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingWelcome from '../screens/onboarding/OnboardingWelcome';
import OnboardingQuestions from '../screens/onboarding/OnboardingQuestions';
import OnboardingProcessing from '../screens/onboarding/OnboardingProcessing';
import OnboardingPlanResult from '../screens/onboarding/OnboardingPlanResult';

const Stack = createStackNavigator();

export default function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={OnboardingWelcome} />
      <Stack.Screen name="Questions" component={OnboardingQuestions} />
      <Stack.Screen name="Processing" component={OnboardingProcessing} />
      <Stack.Screen name="PlanResult" component={OnboardingPlanResult} />
    </Stack.Navigator>
  );
}
