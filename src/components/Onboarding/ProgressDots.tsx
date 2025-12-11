import React from 'react';
import { View } from 'react-native';
import styles from './OnboardingComponents.styles';

type Props = {
  step: number; // 1-based
  total?: number; // default 3
};

const ProgressDots: React.FC<Props> = ({ step, total = 3 }) => {
  const dots = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <View style={styles.dotsContainer}>
      {dots.map((d) => (
        <View key={d} style={[styles.dot, d === step ? styles.dotActive : null]} />
      ))}
    </View>
  );
};

export default ProgressDots;
