import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOnboarding } from '../../context/OnboardingContext';
import OptionCard from '../../components/OptionCard/OptionCard';
import OnboardingStyles from './OnboardingStyles';

const TOTAL_STEPS = 7;

const OnboardingFinancialSituation: React.FC = () => {
  const navigation = useNavigation();
  const { state, updateAnswer, setStep } = useOnboarding();

  // Map any existing english values to the spanish tokens used in UI
  const mapIncome = (v: any) => (v === 'weekly' ? 'semanal' : v === 'biweekly' ? 'quincenal' : v === 'monthly' ? 'mensual' : v);
  const mapExpense = (v: any) => (v === 'always' ? 'siempre' : v === 'sometimes' ? 'aveces' : v === 'never' ? 'nunca' : v);
  const mapSaving = (v: any) => (v === 'yes' ? 'si' : v === 'no' ? 'no' : v);
  const mapLargest = (v: any) =>
    v === 'housing' ? 'vivienda' : v === 'food' ? 'comida' : v === 'transportation' ? 'transporte' : v === 'debts' ? 'deudas' : v;

  const [incomeFrequency, setIncomeFrequency] = useState<'semanal' | 'quincenal' | 'mensual' | null>(
    mapIncome(state.incomeFrequency) || null
  );
  const [expenseControl, setExpenseControl] = useState<'siempre' | 'aveces' | 'nunca' | null>(mapExpense(state.expenseControl) || null);
  const [savingHabit, setSavingHabit] = useState<'si' | 'no' | null>(mapSaving(state.savingHabit) || null);
  const [largestExpense, setLargestExpense] = useState<'vivienda' | 'comida' | 'transporte' | 'deudas' | 'otro' | null>(
    mapLargest(state.largestExpense) || null
  );

  // This screen is step 3 in the flow
  useEffect(() => {
    setStep(3);
  }, [setStep]);

  const progressPercent = Math.round((3 / TOTAL_STEPS) * 100);
  const canContinue = !!incomeFrequency && !!expenseControl && !!savingHabit && !!largestExpense;

  const onContinue = () => {
    if (!canContinue) return;
    updateAnswer('incomeFrequency', incomeFrequency);
    updateAnswer('expenseControl', expenseControl);
    updateAnswer('savingHabit', savingHabit);
    updateAnswer('largestExpense', largestExpense);
    setStep(4);
    // navigate to Lifestyle (step 4)
    (navigation as any).navigate('Lifestyle');
  };

  const styles = OnboardingStyles;

  return (
    <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
      <View style={styles.progressWrap}>
        <Text style={styles.stepText}>{`Paso 3 de ${TOTAL_STEPS}`}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>

      <Text style={styles.title}>Hablemos de tu situación financiera</Text>
      <Text style={styles.subtitle}>Esto nos ayudará a crear un presupuesto que realmente funcione para ti.</Text>

      <Text style={styles.label}>¿Cada cuánto recibes tus ingresos?</Text>
      <View style={styles.optionsColumn}>
        <View style={styles.cardWrapper}>
          <OptionCard title="Semanal" selected={incomeFrequency === 'semanal'} onPress={() => setIncomeFrequency('semanal')} />
        </View>
        <View style={styles.cardWrapperFull}>
          <OptionCard title="Quincenal" selected={incomeFrequency === 'quincenal'} onPress={() => setIncomeFrequency('quincenal')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard title="Mensual" selected={incomeFrequency === 'mensual'} onPress={() => setIncomeFrequency('mensual')} />
        </View>
      </View>

      <Text style={styles.label}>¿Sueles controlar tus gastos?</Text>
      <View style={styles.optionsRowWrap}>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="👍" title="Sí, siempre" selected={expenseControl === 'siempre'} onPress={() => setExpenseControl('siempre')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="🤔" title="A veces" selected={expenseControl === 'aveces'} onPress={() => setExpenseControl('aveces')} />
        </View>
      </View>
      <View style={styles.optionsRowWrap}>
        <View style={styles.cardWrapperFull}>
          <OptionCard emoji="👎" title="No, nunca" selected={expenseControl === 'nunca'} onPress={() => setExpenseControl('nunca')} />
        </View>
      </View>

      <Text style={styles.label}>¿Tienes el hábito de ahorrar?</Text>
      <View style={styles.optionsRow}>
        <View style={styles.cardWrapper}>
          <OptionCard title="Sí" selected={savingHabit === 'si'} onPress={() => setSavingHabit('si')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard title="No" selected={savingHabit === 'no'} onPress={() => setSavingHabit('no')} />
        </View>
      </View>

      <Text style={styles.label}>¿Cuál es tu gasto fijo más grande?</Text>
      <View style={styles.expenseGrid}>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="🏠" title="Vivienda" selected={largestExpense === 'vivienda'} onPress={() => setLargestExpense('vivienda')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="🛒" title="Comida" selected={largestExpense === 'comida'} onPress={() => setLargestExpense('comida')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="🚗" title="Transporte" selected={largestExpense === 'transporte'} onPress={() => setLargestExpense('transporte')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="💳" title="Deudas" selected={largestExpense === 'deudas'} onPress={() => setLargestExpense('deudas')} />
        </View>
        <View style={styles.cardWrapperFull}>
          <OptionCard emoji="🤷‍♀️" title="Otro" selected={largestExpense === 'otro'} onPress={() => setLargestExpense('otro')} />
        </View>
      </View>

      <View style={styles.buttonContainerFull}>
        <TouchableOpacity
          style={[styles.continueButton, styles.continueButtonFull, !canContinue && styles.continueDisabled]}
          onPress={onContinue}
          activeOpacity={0.9}
        >
          <Text style={[styles.continueText, !canContinue && styles.continueTextDisabled]}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OnboardingFinancialSituation;
