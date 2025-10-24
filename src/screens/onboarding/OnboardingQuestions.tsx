import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOnboarding } from '../../context/OnboardingContext';
import OptionCard from '../../components/OptionCard/OptionCard';
import OnboardingStyles from './OnboardingStyles';

const TOTAL_STEPS = 7;

const OnboardingQuestions: React.FC = () => {
  const navigation = useNavigation();
  const { state, updateAnswer, setStep } = useOnboarding();
  const [city, setCity] = useState(state.city || '');
  const [neighborhood, setNeighborhood] = useState(state.neighborhood || '');
  const [livingWith, setLivingWith] = useState(state.livingWith || null);
  const [hasDependents, setHasDependents] = useState(state.hasDependents ?? null);
  const [occupation, setOccupation] = useState(state.occupation || '');
  const [transport, setTransport] = useState(state.transport || null);

  useEffect(() => updateAnswer('city', city), [city, updateAnswer]);
  useEffect(() => updateAnswer('neighborhood', neighborhood), [neighborhood, updateAnswer]);
  useEffect(() => updateAnswer('livingWith', livingWith), [livingWith, updateAnswer]);
  useEffect(() => updateAnswer('hasDependents', hasDependents), [hasDependents, updateAnswer]);
  useEffect(() => updateAnswer('occupation', occupation), [occupation, updateAnswer]);
  useEffect(() => updateAnswer('transport', transport), [transport, updateAnswer]);

  // This screen corresponds to step 2 of the onboarding flow.
  useEffect(() => {
    setStep(2);
  }, [setStep]);

  const CURRENT_STEP = 2;
  const progressPercent = Math.round((CURRENT_STEP / TOTAL_STEPS) * 100);
  const canContinue = city.trim().length > 0 && !!livingWith;

  const onContinue = () => {
    if (canContinue) {
      updateAnswer('city', city);
      updateAnswer('neighborhood', neighborhood);
      updateAnswer('livingWith', livingWith);
      updateAnswer('hasDependents', hasDependents);
      updateAnswer('occupation', occupation);
      updateAnswer('transport', transport);
      setStep(3); // move to step 3 for the next screen
      (navigation as any).navigate('FinancialSituation'); // Navigate to FinancialSituation
    }
  };

  const styles = OnboardingStyles;

  return (
    <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
      <View style={styles.topRow}>
        <View style={styles.progressWrap}>
          <Text style={styles.stepText}>{`Paso ${CURRENT_STEP} de ${TOTAL_STEPS}`}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>
      </View>

      <Text style={styles.title}>Conozcámonos un poco</Text>

      <Text style={styles.label}>¿En qué ciudad vives?</Text>
      <Text style={styles.helper}>Saber dónde estás nos ayuda a darte consejos más locales.</Text>
      <TextInput style={styles.input} placeholder="Ej: Ciudad de México" value={city} onChangeText={setCity} />

      <Text style={styles.label}>¿Y en qué zona o barrio?</Text>
      <Text style={styles.helper}>¡Cada barrio tiene su propio ritmo! Esto nos ayuda a entender tu entorno.</Text>
      <TextInput style={styles.input} placeholder="Ej: La Condesa" value={neighborhood} onChangeText={setNeighborhood} />

      <Text style={styles.label}>¿Con quién vives?</Text>
      <Text style={styles.helper}>Tu compañía diaria influye en tus gastos y metas.</Text>
      <View style={styles.optionsRow}>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="🙋" title="Solo/a" selected={livingWith==='solo'} onPress={() => setLivingWith('solo')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="❤️" title="En pareja" selected={livingWith==='pareja'} onPress={() => setLivingWith('pareja')} />
        </View>
      </View>
      <View style={styles.optionsRow}>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="👪" title="Familia" selected={livingWith==='familia'} onPress={() => setLivingWith('familia')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="🏘️" title="Roomies" selected={livingWith==='roomies'} onPress={() => setLivingWith('roomies')} />
        </View>
      </View>

      <Text style={styles.label}>¿Alguien depende de ti?</Text>
      <Text style={styles.helper}>Saber esto es clave para planificar a futuro.</Text>
      <View style={styles.optionsRow}>
        <OptionCard emoji="👶" title="Sí" selected={hasDependents===true} onPress={() => setHasDependents(true)} />
        <OptionCard emoji="✖️" title="No" selected={hasDependents===false} onPress={() => setHasDependents(false)} />
      </View>

      <Text style={styles.label}>¿Cuál es tu ocupación?</Text>
      <Text style={styles.helper}>Tu trabajo define gran parte de tu rutina financiera.</Text>
      <TextInput style={styles.input} placeholder="Ej: Diseñador/a Gráfico/a" value={occupation} onChangeText={setOccupation} />

      <Text style={styles.label}>¿Cómo te mueves por la ciudad?</Text>
      <Text style={styles.helper}>El transporte es un gasto importante, ¡vamos a optimizarlo!</Text>
      <View style={styles.optionsRow}>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="🚌" title="Público" selected={transport==='public'} onPress={() => setTransport('public')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="🚗" title="Vehículo" selected={transport==='vehicle'} onPress={() => setTransport('vehicle')} />
        </View>
      </View>
      <View style={styles.optionsRow}>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="🚲" title="Bicicleta" selected={transport==='bike'} onPress={() => setTransport('bike')} />
        </View>
        <View style={styles.cardWrapper}>
          <OptionCard emoji="🚶" title="A pie" selected={transport==='walk'} onPress={() => setTransport('walk')} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
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

export default OnboardingQuestions;
