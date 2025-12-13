import React from 'react';
import { View, Text, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOnboarding } from '../../hooks/useOnboarding';
import QuestionField from '../../components/Onboarding/QuestionField';
import ContinueButton from '../../components/Onboarding/ContinueButton';
import SingleSelectGrid from '../../components/Onboarding/SingleSelectGrid';
import OnboardingStyles from './OnboardingStyles';
import Header from '../../components/Onboarding/Header';
import { getOnboardingForTone } from '../../data/onboardingQuestions';

const OnboardingQuestions: React.FC = () => {
  const navigation = useNavigation();
  const {
    state,
    setStep,
    city,
    setCity,
    neighborhood,
    setNeighborhood,
    livingWith,
    setLivingWith,
    canContinueQuestions,
  } = useOnboarding();

  // mark current step
  React.useEffect(() => {
    setStep(2);
  }, [setStep]);

  const CURRENT_STEP = 2;
  const canContinue = canContinueQuestions;

  const onContinue = () => {
    if (canContinue) {
      setStep(3);
      (navigation as any).navigate('FinancialSituation');
    }
  };

  // get data-driven labels/options according to selected tone
  const toneKey = (state.tone as any) || 'friendly';
  const toneConfig = getOnboardingForTone(toneKey as any);
  const screen2 = toneConfig.screen2;

  const mapLivingWithOption = (opt: string) => {
    const lower = opt.toLowerCase();
    if (lower.includes('solo')) return 'solo';
    if (lower.includes('pareja') || lower.includes('parej')) return 'pareja';
    if (lower.includes('famil')) return 'familia';
    if (lower.includes('room')) return 'roomies';
    return opt;
  };

  const styles = OnboardingStyles;

  const TopImage = require('../../assets/images/finzen-NoBackground.png');


  return (
    <View style={styles.scroll}>
      <Header title={screen2.title} description={screen2.description} step={CURRENT_STEP} total={3} topImage={TopImage} />

      <View style={styles.contentContainer}>
        <QuestionField label={(screen2.questions.find((q) => q.id === 'ciudad') as any)?.label || '¿En qué ciudad vives?'}>
          <Text style={styles.helper}>{(screen2.questions.find((q) => q.id === 'ciudad') as any)?.helperText || 'Saber dónde estás nos ayuda a darte consejos más locales.'}</Text>
          <TextInput style={styles.input} placeholder="Ej: Ciudad de México" value={city} onChangeText={setCity} />
        </QuestionField>

        <QuestionField label={(screen2.questions.find((q) => q.id === 'zona') as any)?.label || '¿Y en qué zona o barrio?'}>
          <Text style={styles.helper}>{(screen2.questions.find((q) => q.id === 'zona') as any)?.helperText || ''}</Text>
          <TextInput style={styles.input} placeholder="Ej: La Condesa" value={neighborhood} onChangeText={setNeighborhood} />
        </QuestionField>

        <QuestionField label={(screen2.questions.find((q) => q.id === 'convivencia') as any)?.label || '¿Con quién vives?'}>
          <Text style={styles.helper}>{(screen2.questions.find((q) => q.id === 'convivencia') as any)?.helperText || 'Tu compañía diaria influye en tus gastos y metas.'}</Text>
          <SingleSelectGrid
            options={((screen2.questions.find((q) => q.id === 'convivencia') as any)?.options || []).map((opt: string, idx: number) => ({
              key: mapLivingWithOption(opt),
              label: opt,
              emoji: ['🙋', '❤️', '👪', '🏘️'][idx] || '🏘️',
            }))}
            selected={livingWith}
            onSelect={setLivingWith}
          />
        </QuestionField>
        <ContinueButton disabled={!canContinue} onPress={() => (canContinue ? onContinue() : null)} />
      </View>
    </View>
  );
};

export default OnboardingQuestions;