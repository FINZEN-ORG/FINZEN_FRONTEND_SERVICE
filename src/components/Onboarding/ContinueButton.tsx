import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './OnboardingComponents.styles';

type Props = {
  disabled?: boolean;
  onPress?: () => void;
  label?: string;
  fullWidth?: boolean;
};

const ContinueButton: React.FC<Props> = ({ disabled, onPress, label = 'Continuar', fullWidth = true }) => {
  return (
    <TouchableOpacity style={[styles.continueButton, fullWidth && styles.continueButtonFull, disabled && styles.continueDisabled]} onPress={onPress} activeOpacity={0.9}>
      <Text style={[styles.continueText, disabled && styles.continueTextDisabled]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ContinueButton;
