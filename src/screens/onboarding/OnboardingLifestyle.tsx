import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';
import { useNavigation } from '@react-navigation/native';
import OptionCard from '../../components/OptionCard/OptionCard';
import OnboardingStyles from './OnboardingStyles';

const TOTAL_STEPS = 5;

const OnboardingLifestyle: React.FC = () => {
  const navigation = useNavigation();
  const { state, updateAnswer, setStep } = useOnboarding();

  const [favoriteSpending, setFavoriteSpending] = useState<string | null>(state.favoriteSpending || null);
  const [weekendType, setWeekendType] = useState<'siempre' | 'aveces' | 'casa' | null>(state.weekendType || null);
  const [relaxActivities, setRelaxActivities] = useState<string[]>(state.relaxActivities || []);

  useEffect(() => {
    setStep(4);
  }, [setStep]);

  useEffect(() => updateAnswer('favoriteSpending', favoriteSpending), [favoriteSpending, updateAnswer]);
  useEffect(() => updateAnswer('weekendType', weekendType), [weekendType, updateAnswer]);
  useEffect(() => updateAnswer('relaxActivities', relaxActivities), [relaxActivities, updateAnswer]);

  const progressPercent = Math.round((4 / TOTAL_STEPS) * 100);

  const toggleRelax = (value: string) => {
    setRelaxActivities(prev => (prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]));
  };

  const canContinue = !!favoriteSpending && !!weekendType && relaxActivities.length > 0;

  const onContinue = () => {
    if (!canContinue) return;
    updateAnswer('favoriteSpending', favoriteSpending);
    updateAnswer('weekendType', weekendType);
    updateAnswer('relaxActivities', relaxActivities);
    setStep(5);
    (navigation as any).navigate('Summary');
  };

  const styles = OnboardingStyles;

  return (
    <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
      <View style={styles.progressWrap}>
        <Text style={styles.stepText}>{`Paso 4 de ${TOTAL_STEPS}`}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>

      <Text style={styles.title}>Casi hemos terminado. Queremos conocerte mejor.</Text>
      <Text style={styles.subtitle}>Tus respuestas nos ayudarán a crear un plan que realmente se adapte a ti.</Text>

      <Text style={styles.label}>¿En qué disfrutas más gastar tu dinero?</Text>
      <View style={styles.expenseGrid}>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="🍽️" title="Comida y\nrestaurantes" selected={favoriteSpending === 'comida'} onPress={() => setFavoriteSpending('comida')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="✈️" title="Viajes" selected={favoriteSpending === 'viajes'} onPress={() => setFavoriteSpending('viajes')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="🛍️" title="Ropa y\naccesorios" selected={favoriteSpending === 'ropa'} onPress={() => setFavoriteSpending('ropa')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="💻" title="Tecnología" selected={favoriteSpending === 'tecnologia'} onPress={() => setFavoriteSpending('tecnologia')} />
        </View>
      </View>

      <Text style={styles.label}>¿Cómo son tus fines de semana?</Text>
      <View style={styles.optionsRow}>
        <View style={styles.cardWrapper}>
          <OptionCard title="Siempre salgo" selected={weekendType === 'siempre'} onPress={() => setWeekendType('siempre')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard title="A veces" selected={weekendType === 'aveces'} onPress={() => setWeekendType('aveces')} />
        </View>
      </View>
      <View style={styles.optionsRow}>
        <View style={styles.cardWrapper}>
          <OptionCard title="Prefiero casa" selected={weekendType === 'casa'} onPress={() => setWeekendType('casa')} />
        </View>
      </View>

      <Text style={styles.label}>¿Qué te ayuda a relajarte?</Text>
      <View style={styles.expenseGrid}>
        <View style={styles.cardWrapper}>
          <OptionCard title="Hacer deporte" selected={relaxActivities.includes('deporte')} onPress={() => toggleRelax('deporte')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard title="Leer" selected={relaxActivities.includes('leer')} onPress={() => toggleRelax('leer')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard title="Ver series" selected={relaxActivities.includes('series')} onPress={() => toggleRelax('series')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard title="Salir con amigos" selected={relaxActivities.includes('amigos')} onPress={() => toggleRelax('amigos')} />
        </View>
        <View style={styles.cardWrapperFull}>
          <OptionCard title="Meditar" selected={relaxActivities.includes('meditar')} onPress={() => toggleRelax('meditar')} />
        </View>
      </View>

      <View style={styles.buttonContainerFull}>
        <TouchableOpacity style={[styles.continueButton, styles.continueButtonFull, !canContinue && styles.continueDisabled]} onPress={onContinue} activeOpacity={0.9}>
          <Text style={[styles.continueText, !canContinue && styles.continueTextDisabled]}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OnboardingLifestyle;
