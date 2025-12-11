import React, { useMemo } from 'react';
import { View, TextInput } from 'react-native';
import OptionCard from '../../components/OptionCard/OptionCard';
import { colors } from '../../styles/colors';
import Header from '../../components/Onboarding/Header';
import QuestionField from '../../components/Onboarding/QuestionField';
import MultiSelectList from '../../components/Onboarding/MultiSelectList';
import ContinueButton from '../../components/Onboarding/ContinueButton';
import styles from './OnboardingStyles';
import { useNavigation } from '@react-navigation/native';
import { NeutralScreen, Question } from '../../data/onboardingQuestions';
import { useOnboarding } from '../../hooks/useOnboarding';

const TopImage = require('../../assets/images/finzen-NoBackground.png');

const OnboardingWelcome: React.FC = () => {
  const { state, name, setName, selectedGoals, toggleGoal, selectedTone, setSelectedTone, canContinueWelcome } = useOnboarding();
  const navigation = useNavigation();

  // extract questions from data-driven pantalla1Neutral
  const questions: Question[] = useMemo(() => NeutralScreen.questions as Question[], []);

  // state and persistence handled inside `useOnboarding` hook

  const onContinue = () => {
    // navigate to next onboarding screen (assumes route exists)
    (navigation as any).navigate('Questions');
  };

  const canContinue = canContinueWelcome;

  return (
    <View style={styles.scroll}>
      <Header title={NeutralScreen.title} description={NeutralScreen.description} step={state.step + 1} total={3} topImage={TopImage} />

      <QuestionField label={(questions.find((q) => q.id === 'nombre') as any)?.label || 'Nombre'} helper={'Ej: Alex'}>
        <TextInput
          style={styles.input}
          placeholder="Ej: Alex"
          placeholderTextColor={colors.textSecondary}
          value={name}
          onChangeText={setName}
        />
      </QuestionField>

      <QuestionField label={(questions.find((q) => q.id === 'tono') as any)?.label || 'Tono'} helper={(questions.find((q) => q.id === 'tono') as any)?.helperText || ''}>
        <View style={styles.toneGrid}>
          {((questions.find((q) => q.id === 'tono') as any)?.options || []).map((opt: string) => {
            const map: Record<string, string> = {
              Formal: 'formal',
              Amigable: 'friendly',
              Motivador: 'motivating',
              Directo: 'direct',
            };
            const key = map[opt] || opt.toLowerCase();
            const lower = opt.toLowerCase();
            const emoji = lower.includes('formal') ? '💼' : lower.includes('amig') ? '😊' : lower.includes('motiv') ? '🚀' : '➡️';
            return (
              <OptionCard
                key={opt}
                emoji={emoji}
                title={opt}
                titleStyle={styles.toneTitle}
                containerStyle={styles.toneCardCompact}
                selected={selectedTone === key}
                onPress={() => setSelectedTone(key)}
              />
            );
          })}
        </View>
      </QuestionField>

      <QuestionField label={'¿Cuál es tu meta financiera principal?'}>
        <MultiSelectList options={((questions.find((q) => q.id === 'objetivos') as any)?.options || []) as string[]} selected={selectedGoals} onToggle={toggleGoal} />
      </QuestionField>

      <ContinueButton disabled={!canContinue} onPress={() => (canContinue ? onContinue() : null)} />
    </View>
  );
};



export default OnboardingWelcome;
