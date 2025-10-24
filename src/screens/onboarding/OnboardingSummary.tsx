import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingStyles from './OnboardingStyles';
import OptionCard from '../../components/OptionCard/OptionCard';

const TOTAL_STEPS = 7;

const OnboardingSummary: React.FC = () => {
  const { state, submit, updateAnswer } = useOnboarding();

  const progressPercent = Math.round(((state.step + 1) / TOTAL_STEPS) * 100);

  // Options for review/edit
  const goals = [
    { key: 'ahorrar', label: 'Ahorrar para algo grande' },
    { key: 'deudas', label: 'Pagar mis deudas' },
    { key: 'invertir', label: 'Empezar a invertir' },
    { key: 'fondo', label: 'Crear fondo de emergencia' },
  ];

  const spendings = [
    { key: 'comida', label: 'Comida y restaurantes' },
    { key: 'viajes', label: 'Viajes' },
    { key: 'ropa', label: 'Ropa y accesorios' },
    { key: 'tecnologia', label: 'Tecnología' },
  ];

  const toggleGoal = (key: string) => {
    // Save chosen goal in state.goal
    updateAnswer('goal', key);
  };

  const toggleSpending = (key: string) => {
    updateAnswer('favoriteSpending', key);
  };

  const onSubmit = () => {
    Alert.alert('Confirmar', '¿Deseas enviar tus respuestas?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Enviar',
        onPress: async () => {
          await submit();
          Alert.alert('Listo', 'Tus respuestas han sido enviadas.');
        },
      },
    ]);
  };

  const styles = OnboardingStyles;

  return (
    <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
      <View style={styles.progressWrap}>
        <Text style={styles.stepText}>{`Paso ${state.step + 1} de ${TOTAL_STEPS}`}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>

      <Text style={styles.title}>Resumen</Text>
      <Text style={styles.subtitle}>Revisa y ajusta tus respuestas antes de finalizar.</Text>

      <Text style={styles.label}>Tu meta financiera</Text>
      <View style={styles.expenseGrid}>
        {goals.map(g => (
          <View key={g.key} style={styles.cardWrapper}>
            <OptionCard title={g.label} selected={state.goal === g.key} onPress={() => toggleGoal(g.key)} />
          </View>
        ))}
      </View>

      <Text style={styles.label}>En qué sueles gastar</Text>
      <View style={styles.expenseGrid}>
        {spendings.map(s => (
          <View key={s.key} style={styles.cardWrapper}>
            <OptionCard title={s.label} selected={state.favoriteSpending === s.key} onPress={() => toggleSpending(s.key)} />
          </View>
        ))}
      </View>

      <View style={styles.buttonContainerFull}>
        <TouchableOpacity style={[styles.continueButton, styles.continueButtonFull]} onPress={onSubmit} activeOpacity={0.9}>
          <Text style={styles.continueText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OnboardingSummary;
