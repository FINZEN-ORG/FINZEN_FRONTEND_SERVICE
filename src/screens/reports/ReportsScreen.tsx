import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { globalStyles } from '../../styles';
import { ScreenTitle } from '../../components';
import useReports from './useReports';

const ReportsScreen: React.FC = () => {
  const { loading, refreshing, totalIncome, totalExpense, onRefresh, balance, savingsRate } = useReports();

  if (loading) {
    return (
        <View style={[globalStyles.screenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#6C5CE7" />
        </View>
    );
  }

  return (
      <ScrollView
          style={globalStyles.screenContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      >
        <ScreenTitle
            title="Reportes"
            subtitle="Análisis de tus finanzas"
        />

        {/* Balance Card */}
        <View style={{
          margin: 16,
          padding: 20,
          backgroundColor: balance >= 0 ? '#00D084' : '#FF6B6B',
          borderRadius: 12,
          elevation: 4
        }}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Balance General</Text>
          <Text style={{ color: '#fff', fontSize: 36, fontWeight: 'bold', marginTop: 8 }}>
            ${balance.toFixed(2)}
          </Text>
          <Text style={{ color: '#fff', fontSize: 14, marginTop: 4, opacity: 0.9 }}>
            Tasa de ahorro: {savingsRate}%
          </Text>
        </View>

        {/* Summary Cards */}
        <View style={{ padding: 16 }}>
          <View style={{
            backgroundColor: '#fff',
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
            elevation: 2
          }}>
            <Text style={{ fontSize: 14, color: '#666' }}>Ingresos Totales</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#00D084', marginTop: 8 }}>
              ${totalIncome.toFixed(2)}
            </Text>
          </View>

          <View style={{
            backgroundColor: '#fff',
            padding: 16,
            borderRadius: 12,
            elevation: 2
          }}>
            <Text style={{ fontSize: 14, color: '#666' }}>Gastos Totales</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#FF6B6B', marginTop: 8 }}>
              ${totalExpense.toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>
  );
};

export default ReportsScreen;