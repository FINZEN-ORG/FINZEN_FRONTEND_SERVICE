import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 6;
const CARD_WIDTH = (width - 40) / 2 - CARD_MARGIN;

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
    height: 180,
    marginBottom: 10,
  },

  recentExpensesContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },

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

  floatingButton: {
    position: 'absolute',
    bottom: 30,
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

  floatingMenu: {
    position: 'absolute',
    bottom: 95,
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

  // ==========================================
  // NUEVOS ESTILOS PARA IA Y GRID
  // ==========================================
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerContainer: {
    marginBottom: 10,
  },

  // Botones de acción principales (nueva versión)
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  categoryButton: {
    flex: 0.48,
    backgroundColor: colors.backgroundLightest,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  budgetButton: {
    flex: 0.48,
    backgroundColor: '#F0F4FF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0FF',
  },

  buttonEmoji: {
    fontSize: 24,
  },

  categoryButtonText: {
    color: colors.primaryDark,
    fontWeight: typography.fontWeight.bold,
    marginTop: 5,
  },

  budgetButtonText: {
    color: '#6C5CE7',
    fontWeight: typography.fontWeight.bold,
    marginTop: 5,
  },

  // Card de sugerencia de IA
  aiSuggestionCard: {
    backgroundColor: '#FFF8E7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#FFD966',
    borderStyle: 'dashed',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  aiHeaderEmoji: {
    fontSize: 20,
    marginRight: 8,
  },

  aiHeaderTitle: {
    fontSize: 16,
    fontWeight: typography.fontWeight.bold,
    color: '#D97706',
  },

  aiDescription: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 20,
    marginBottom: 12,
  },

  aiDetailsBox: {
    backgroundColor: 'rgba(217, 119, 6, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  aiDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  aiDetailLabel: {
    fontSize: 12,
    color: '#92400E',
  },

  aiDetailValue: {
    fontSize: 14,
    fontWeight: typography.fontWeight.bold,
    color: '#D97706',
  },

  aiAmountValue: {
    fontSize: 18,
    fontWeight: typography.fontWeight.bold,
    color: '#D97706',
  },

  aiPeriodValue: {
    fontSize: 12,
    color: '#78350F',
  },

  aiTipBox: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },

  aiTipLabel: {
    fontSize: 11,
    color: '#15803D',
    marginBottom: 4,
  },

  aiTipText: {
    fontSize: 12,
    color: '#166534',
    lineHeight: 16,
  },

  aiButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },

  aiDismissButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D97706',
    alignItems: 'center',
  },

  aiDismissButtonText: {
    color: '#D97706',
    fontWeight: typography.fontWeight.semibold,
  },

  aiAcceptButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#D97706',
    alignItems: 'center',
  },

  aiAcceptButtonText: {
    color: 'white',
    fontWeight: typography.fontWeight.bold,
  },

  aiLoadingCard: {
    backgroundColor: '#FFF8E7',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD966',
  },

  aiLoadingText: {
    fontSize: 12,
    color: '#92400E',
    marginTop: 8,
  },

  // Título de sección
  sectionTitle: {
    fontSize: 20,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: 15,
    marginLeft: 5,
  },

  // Grid de presupuestos
  columnWrapper: {
    justifyContent: 'flex-start',
  },

  flatListContent: {
    paddingHorizontal: 5,
    paddingBottom: 100,
  },

  budgetCard: {
    width: CARD_WIDTH,
    margin: CARD_MARGIN,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderTopWidth: 4,
  },

  budgetCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  budgetCardEmoji: {
    fontSize: 22,
  },

  budgetCardPercentage: {
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
  },

  budgetCardTitle: {
    fontSize: 14,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },

  budgetCardLimit: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },

  budgetProgressBar: {
    height: 4,
    backgroundColor: '#EEE',
    borderRadius: 2,
    overflow: 'hidden',
  },

  budgetProgressFill: {
    height: '100%',
  },

  budgetCardSpent: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
    opacity: 0.6,
  },

  emptyStateEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },

  emptyStateText: {
    color: colors.textSecondary,
  },

  emptyStateSubtext: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 5,
  },
});