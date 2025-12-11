import { useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAuthActions } from '../../hooks/useAuthActions';
import TransactionService, { TransactionResponse } from '../../services/TransactionService';
import { useFocusEffect } from '@react-navigation/native';

export default function useDashboard() {
    const { user } = useAuth();
    const { handleLogout } = useAuthActions();

    const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    const loadDashboardData = async () => {
        try {
            setLoading(true);

            // Imprimir token en consola
            const AsyncStorage = require('@react-native-async-storage/async-storage').default;
            const token = await AsyncStorage.getItem('jwt');
            console.log('🔑 JWT TOKEN:', token);

            const transactionsData = await TransactionService.getAllTransactions();
            setTransactions(transactionsData);

            const reports = await TransactionService.getReports();
            setTotalIncome(reports.totalIncome);
            setTotalExpense(reports.totalExpense);
        } catch (error) {
            // silent
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (user) {
                loadDashboardData();
            }
        }, [user])
    );

    const onRefresh = () => {
        setRefreshing(true);
        loadDashboardData();
    };

    const onLogoutPress = async () => {
        try {
            await handleLogout();
        } catch (error) {
            // swallow; handled in hook
        }
    };

    return {
        user,
        transactions,
        loading,
        refreshing,
        totalIncome,
        totalExpense,
        onRefresh,
        onLogoutPress,
    };
}
