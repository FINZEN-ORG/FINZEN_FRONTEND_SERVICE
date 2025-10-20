import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

const { width } = Dimensions.get('window');

export const budgetStyles = StyleSheet.create({
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
  categoriesSection: {
    height: 180, // Altura fija para las categorías
    marginBottom: 10,
  },
  recentExpensesContainer: {
    flex: 1,
    paddingHorizontal: 0,
    
  },
  // Botón para añadir gasto
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  addExpenseButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addExpenseText: {
    color: colors.textWhite,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    marginLeft: 4,
  },
  addExpenseIcon: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: typography.fontWeight.bold,
  },

  // Botones de acción principales
  actionButtonsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  createCategoryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  createCategoryButtonText: {
    color: colors.textWhite,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  addIncomeButton: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  addIncomeButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },

  // Botón flotante (FAB)
  floatingButton: {
    position: 'absolute',
    bottom: 30, // Más cerca del borde inferior
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: colors.textSecondary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  floatingButtonIcon: {
    fontSize: 24,
    color: colors.textWhite,
    fontWeight: typography.fontWeight.bold,
  },

  // Menú flotante
  floatingMenu: {
    position: 'absolute',
    bottom: 95, // Ajustado para la nueva posición del botón (30 + 56 + 9 = 95)
    right: 20,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 180,
    elevation: 12,
    shadowColor: colors.textSecondary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  floatingMenuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  floatingMenuItemWithBorder: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  floatingMenuText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
});