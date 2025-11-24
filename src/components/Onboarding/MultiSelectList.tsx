import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './OnboardingComponents.styles';

type Props = {
  options: string[];
  selected: string[];
  onToggle: (opt: string) => void;
};

const MultiSelectList: React.FC<Props> = ({ options, selected, onToggle }) => {
  return (
    <View style={styles.multiContainer}>
      {options.map((opt) => {
        const isSelected = selected.includes(opt);
        return (
          <TouchableOpacity key={opt} style={[styles.multiItem, isSelected && styles.multiItemSelected]} onPress={() => onToggle(opt)} activeOpacity={0.85}>
            <Text style={[styles.multiItemText, isSelected && styles.multiItemTextSelected]} numberOfLines={2} ellipsizeMode="tail">
              {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MultiSelectList;
