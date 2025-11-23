import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '../../styles/colors';

type Props = {
  title: string;
  selected?: boolean;
  onPress?: () => void;
  emoji?: string;
  titleStyle?: any;
  containerStyle?: any;
};

const OptionCard: React.FC<Props> = ({ title, selected, onPress, emoji, titleStyle, containerStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, containerStyle, selected && styles.cardSelected]} activeOpacity={0.85}>
      {emoji ? (
        <View style={styles.emojiContainer}>
          <Text style={[styles.emoji, selected && styles.emojiSelected]}>{emoji}</Text>
        </View>
      ) : null}
      <Text style={[styles.title, selected && styles.titleSelected, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 6,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
  },
  cardSelected: {
    borderColor: colors.primary,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },
  emojiContainer: {
    marginBottom: 8,
  },
  emoji: {
    fontSize: 20,
  },
  emojiSelected: {
    color: colors.primary,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 14,
  },
  titleSelected: {
    color: colors.primary,
  },
});

export default OptionCard;
