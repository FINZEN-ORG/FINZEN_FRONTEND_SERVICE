import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

const { width } = Dimensions.get('window');

export const addExpenseStyles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.bold,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  placeholder: {
    width: 40,
  },

});