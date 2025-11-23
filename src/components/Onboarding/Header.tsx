import React from 'react';
import { View, Text, Image } from 'react-native';
import ProgressDots from './ProgressDots';
import styles from './OnboardingComponents.styles';

type Props = {
  title: string;
  description?: string;
  step?: number; 
  total?: number;
  topImage?: any;
};

const Header: React.FC<Props> = ({ title, description, step = 1, total = 3, topImage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {topImage ? <Image source={topImage} style={styles.topImage} /> : null}
        <View style={styles.metaRight}>
          <ProgressDots step={step} total={total} />
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
};
export default Header;
