import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { OnboardingProvider } from './src/context/OnboardingContext';

export default function App() {
  return (
    <OnboardingProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </OnboardingProvider>
  );
}