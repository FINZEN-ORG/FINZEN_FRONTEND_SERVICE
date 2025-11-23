import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import styles from './OnboardingComponents.styles';

type Props = {
  label: string;
  helper?: string;
  children?: ReactNode;
};

const QuestionField: React.FC<Props> = ({ label, children }) => {
  return (
    <View style={{ marginBottom: 6, height: 'auto' }}>
      <Text style={styles.qLabel}>{label}</Text>
      {children}
    </View>
  );
};

export default QuestionField;
