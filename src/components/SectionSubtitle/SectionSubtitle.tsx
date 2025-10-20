import React from 'react';
import { Text } from 'react-native';
import { styles } from './SectionSubtitle.styles';

export interface SectionSubtitleProps {
  text: string;
  marginTop?: boolean;
  marginBottom?: boolean;
}

export const SectionSubtitle: React.FC<SectionSubtitleProps> = ({
  text,
  marginTop = false,
  marginBottom = true,
}) => {
  return (
    <Text 
      style={[
        styles.subtitle,
        marginTop && styles.marginTop,
        marginBottom && styles.marginBottom,
      ]}
    >
      {text}
    </Text>
  );
};

export default SectionSubtitle;