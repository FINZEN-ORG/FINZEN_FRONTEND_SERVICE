import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';

const { width } = Dimensions.get('window');

export const form = StyleSheet.create({
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

    input: {
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: typography.fontSize.md,
        color: colors.textPrimary,
        borderWidth: 1,
        borderColor: colors.border,
    },

    dateInput: {
        backgroundColor: '#FFE4B5', 
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: typography.fontSize.md,
        color: colors.textPrimary,
        borderWidth: 1,
        borderColor: '#F4D03F',
    },

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
        color: colors.textLight,
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

    inputError: {
        borderColor: colors.error,
        borderWidth: 2,
    },
    errorText: {
        color: colors.error,
        fontSize: typography.fontSize.sm,
        marginTop: 4,
        marginLeft: 4,
    },

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
    categoriesSection: {
    height: 180, 
    marginBottom: 10,
  },
});