import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingStyles from './OnboardingStyles';

const OnboardingPlanResult: React.FC = () => {
  const { state} = useOnboarding();
  const styles = OnboardingStyles;

  const handleFinish = () => {  
    // Navigate to Dashboard or main app screen
  };
  // Build a simple summary from state
  const ingreso = state.ingreso || state.incomeFrequency || '—';
  const importancia = state.importanciaAhorro ?? state.savingImportance ?? '—';
  const ocio = state.ocio || '—';

  return (
    <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>¡Listo! Aquí está tu plan inicial</Text>
      <Text style={styles.subtitle}>
        Hemos generado un resumen rápido basado en tus respuestas. Puedes ajustar el plan desde el dashboard.
      </Text>

      <View style={styles.goalItem}>
        <Text style={styles.goalText}>Ingreso</Text>
        <Text style={styles.goalTextSelected}>{ingreso}</Text>
      </View>

      <View style={styles.goalItem}>
        <Text style={styles.goalText}>Importancia de ahorrar</Text>
        <Text style={styles.goalTextSelected}>{importancia}</Text>
      </View>

      <View style={styles.goalItem}>
        <Text style={styles.goalText}>Incluye ocio</Text>
        <Text style={styles.goalTextSelected}>{ocio}</Text>
      </View>

      <View style={styles.buttonContainerFull}>
        <TouchableOpacity style={[styles.continueButton, styles.continueButtonFull]} onPress={handleFinish} activeOpacity={0.9}>
          <Text style={styles.continueText}>Ir al Dashboard</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OnboardingPlanResult;

