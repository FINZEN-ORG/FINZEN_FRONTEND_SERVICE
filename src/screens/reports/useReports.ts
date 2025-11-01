import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import TransactionService from '../../services/TransactionService';

export default function useReports() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const loadReports = async () => {
    try {
      setLoading(true);
      const reports = await TransactionService.getReports();
      setTotalIncome(reports.totalIncome);
      setTotalExpense(reports.totalExpense);
    } catch (error) {
      // swallow error; component will show empty state
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadReports();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadReports();
  };

  const balance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

  return {
    loading,
    refreshing,
    totalIncome,
    totalExpense,
    onRefresh,
    balance,
    savingsRate,
  };
}
