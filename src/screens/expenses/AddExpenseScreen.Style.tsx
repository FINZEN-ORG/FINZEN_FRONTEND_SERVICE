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


  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 0,
  },


  section: {
    marginTop: 15,
  },
  label: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: 12,
    fontStyle: 'normal',
  },

  // Amount Input
  amountInput: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Description Input
  descriptionInput: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Categories Layout 2x2 (copiado de BudgetScreen)
  categoriesSection: {
    height: 180, // Altura fija para las categorías
    marginBottom: 10,
  },
  blockContainer: {
    width: width - 60,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  categoryWrapper: {
    width: '45%',
    marginVertical: 5,
  },
  flatListContainer: {
    paddingHorizontal: 8,
  },

  // Date Input
  dateInput: {
    backgroundColor: '#FFE4B5', // Color amarillo como en la imagen
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: '#F4D03F',
  },

  // Buttons
  buttonsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.background,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  confirmButtonText: {
    color: colors.textWhite,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  cancelButton: {
    backgroundColor: colors.borderLight,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },

  // Estilos para errores
  inputError: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: typography.fontSize.sm,
    marginTop: 4,
    marginLeft: 4,
  },

  // Estilos para loading
  loadingButton: {
    opacity: 0.7,
  },
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginLeft: 8,
  },
});