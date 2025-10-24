import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '../../styles/colors';

type Props = {
  title: string;
  selected?: boolean;
  onPress?: () => void;
  emoji?: string;
};

const OptionCard: React.FC<Props> = ({ title, selected, onPress, emoji }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, selected && styles.cardSelected]}>
      {emoji ? (
        <View style={styles.emojiContainer}>
          <Text style={[styles.emoji, selected && styles.emojiSelected]}>{emoji}</Text>
        </View>
      ) : null}
      <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 18,
    backgroundColor: colors.surface,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    minHeight: 92,
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
    fontSize: 24,
  },
  emojiSelected: {
    color: colors.primary,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: '700',
    textAlign: 'center',
  },
  titleSelected: {
    color: colors.primary,
  },
});

export default OptionCard;
