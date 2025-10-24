import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useOnboarding } from '../../context/OnboardingContext';
import OptionCard from '../../components/OptionCard/OptionCard';
import { colors } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';

const TopImage = require('../../assets/images/finzen-NoBackground.png');

const TOTAL_STEPS = 7;

const OnboardingWelcome: React.FC = () => {
  const { state, updateAnswer } = useOnboarding();
  const navigation = useNavigation();
  const [name, setName] = useState(state.name || '');
  const [goal, setGoal] = useState(state.goal || '');
  const [tone, setTone] = useState<'formal'|'relaxed'|null>(state.tone || null);

  useEffect(() => {
    // keep inputs synced locally but persist only on Continue
    // still update context so other screens reading partial values can see them
    updateAnswer('name', name);
  }, [name, updateAnswer]);

  useEffect(() => {
    updateAnswer('goal', goal);
  }, [goal, updateAnswer]);

  useEffect(() => {
    updateAnswer('tone', tone);
    // removed auto-advance here; navigation happens on Continue press
  }, [tone, updateAnswer]);

  const progressPercent = Math.round(((state.step + 1) / TOTAL_STEPS) * 100);
  const canContinue = name.trim().length > 0 && !!tone;

  const onContinue = () => {
    // ensure latest values persisted, then navigate
    updateAnswer('name', name);
    updateAnswer('goal', goal);
    updateAnswer('tone', tone);
    // navigate to nested screen 'Questions'
    (navigation as any).navigate('Questions');
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
      <View style={styles.topRow}>
        <Image source={TopImage} style={styles.topImage} />
        <View style={styles.progressWrap}>
          <Text style={styles.stepText}>{`Paso ${state.step + 1} de ${TOTAL_STEPS}`}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>
      </View>

      <Text style={styles.title}>¡Bienvenida! Soy tu compañero financiero</Text>
      <Text style={styles.subtitle}>Empecemos por conocernos un poco mejor.</Text>

      <Text style={styles.label}>¿Cómo te llamas?</Text>
      <Text style={styles.helper}>Tu nombre nos ayuda a personalizar los mensajes.</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu nombre"
        placeholderTextColor={colors.textSecondary}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>¿Qué quieres lograr?</Text>
      <Text style={styles.helper}>Contarnos tu objetivo nos ayuda a priorizar tus recomendaciones.</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Ahorrar para un viaje"
        placeholderTextColor={colors.textSecondary}
        value={goal}
        onChangeText={setGoal}
      />

      <Text style={styles.label}>¿Cómo prefieres que hablemos?</Text>
      <Text style={styles.helper}>Escoge el tono con que te llegará la información.</Text>
      <View style={styles.optionsRow}>
        <OptionCard emoji="🎓" title="Formal" selected={tone === 'formal'} onPress={() => setTone('formal')} />
        <OptionCard emoji="😊" title="Relajado" selected={tone === 'relaxed'} onPress={() => setTone('relaxed')} />
      </View>

      <TouchableOpacity
        style={[styles.continueButton, !canContinue && styles.continueDisabled]}
        onPress={() => canContinue ? onContinue() : null}
        activeOpacity={0.9}
      >
        <Text style={[styles.continueText, !canContinue && styles.continueTextDisabled]}>Continuar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: colors.background,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  topImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  progressWrap: {
    flex: 1,
  },
  stepText: {
    color: colors.primaryDarker,
    fontSize: 12,
    marginBottom: 6,
  },
  progressBar: {
    height: 10,
    backgroundColor: colors.borderLight,
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  title: { fontSize: 28, fontWeight: '800', color: colors.primaryDarker, marginTop: 6, marginBottom: 6 },
  subtitle: { fontSize: 16, color: colors.textSecondary, marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '700', marginTop: 12, marginBottom: 6, color: colors.primaryDarker },
  helper: { fontSize: 13, color: colors.primary, marginBottom: 8 },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: 6,
  },
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, marginBottom: 24 },
  continueButton: {
    marginTop: 8,
    backgroundColor: colors.primary,
    borderRadius: 32,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 3,
  },
  continueDisabled: {
    backgroundColor: '#CDEFD8',
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  continueTextDisabled: {
    color: colors.primaryDarker,
  },
});

export default OnboardingWelcome;
