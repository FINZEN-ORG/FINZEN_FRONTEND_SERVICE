import React from 'react';
import { View } from 'react-native';
import OptionCard from '../OptionCard/OptionCard';
import styles from './OnboardingComponents.styles';

type OptionItem = {
  key: string;
  label: string;
  emoji?: string;
};

type Props = {
  options: OptionItem[];
  selected?: string | null;
  onSelect: (key: string) => void;
  itemStyle?: any;
  containerStyle?: any;
  itemInnerStyle?: any;
};

const SingleSelectGrid: React.FC<Props> = ({ options, selected, onSelect, itemStyle, containerStyle, itemInnerStyle }) => {
  return (
    <View style={[styles.multiContainer, containerStyle, {height:''}]}>
      {options.map((o) => (
        <View key={o.key} style={[styles.gridItemWrapper, itemStyle,  {alignItems: 'center'}]}>
          <OptionCard
            emoji={o.emoji}
            title={o.label}
            selected={selected === o.key}
            onPress={() => onSelect(o.key)}
            containerStyle={[styles.gridInnerFull, itemInnerStyle]}
          />
        </View>
      ))}
    </View>
  );
};

export default SingleSelectGrid;
