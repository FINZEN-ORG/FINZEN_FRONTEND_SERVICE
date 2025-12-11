import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles';
import { colors } from '../../styles/colors';
import { HeaderWithBack } from '../../components';
import useReports from './useReports';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import { formatCOP, formatCOPCompact } from '../../utils/formatCurrency';

const ReportsScreen: React.FC = () => {
  const { loading, totalIncome, totalExpense, categoryExpenses } = useReports();
  const [selectedPeriod, setSelectedPeriod] = useState('Este mes');

  if (loading) {
    return (
        <View style={[globalStyles.screenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
  }

  const hasData = totalIncome > 0 || totalExpense > 0;

  const total = totalIncome + totalExpense;
  const incomePercentage = total > 0 ? (totalIncome / total) * 100 : 50;
  const expensePercentage = total > 0 ? (totalExpense / total) * 100 : 50;

  // Cálculos para el gráfico de dona
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const incomeStroke = (incomePercentage / 100) * circumference;
  const expenseStroke = (expensePercentage / 100) * circumference;

  return (
    <ScrollView style={globalStyles.screenContainer}>
      <View style={{ padding: 20, paddingBottom: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.textPrimary, marginTop: 8 }}>Reportes</Text>
      </View>

      {!hasData ? (
        <View style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 40,
          margin: 16,
          elevation: 2,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 48, marginBottom: 16 }}>📊</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 8, textAlign: 'center' }}>
            No hay datos aún
          </Text>
          <Text style={{ fontSize: 14, color: colors.textSecondary, textAlign: 'center', lineHeight: 20 }}>
            Comienza a registrar tus ingresos y gastos para ver tus reportes financieros
          </Text>
        </View>
      ) : (
        <>
      {/* Ingresos vs Gastos Card */}
      <View style={{
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        margin: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.textPrimary }}>Ingresos vs Gastos</Text>
          <TouchableOpacity style={{
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border,
          }}>
            <Text style={{ fontSize: 12, color: colors.textSecondary }}>{selectedPeriod} ▼</Text>
          </TouchableOpacity>
        </View>

        {/* Gráfico de Dona */}
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <Svg width="200" height="200">
            {/* Círculo de fondo */}
            <Circle
              cx="100"
              cy="100"
              r={radius}
              stroke="#E0E0E0"
              strokeWidth="20"
              fill="none"
            />
            {/* Segmento de Ingresos */}
            <Circle
              cx="100"
              cy="100"
              r={radius}
              stroke={colors.primary}
              strokeWidth="20"
              fill="none"
              strokeDasharray={`${incomeStroke} ${circumference}`}
              strokeDashoffset="0"
              rotation="-90"
              origin="100, 100"
            />
            {/* Segmento de Gastos */}
            <Circle
              cx="100"
              cy="100"
              r={radius}
              stroke="#FF6B6B"
              strokeWidth="20"
              fill="none"
              strokeDasharray={`${expenseStroke} ${circumference}`}
              strokeDashoffset={-incomeStroke}
              rotation="-90"
              origin="100, 100"
            />
            {/* Texto central */}
            <SvgText
              x="100"
              y="95"
              textAnchor="middle"
              fontSize="20"
              fontWeight="bold"
              fill={colors.textPrimary}
            >
              {formatCOPCompact(total)}
            </SvgText>
            <SvgText
              x="100"
              y="115"
              textAnchor="middle"
              fontSize="14"
              fill="#999"
            >
              Total
            </SvgText>
          </Svg>
        </View>

        {/* Leyenda */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary, marginRight: 6 }} />
              <Text style={{ fontSize: 12, color: '#666' }}>Ingresos</Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.textPrimary }}>{formatCOPCompact(totalIncome)}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#FF6B6B', marginRight: 6 }} />
              <Text style={{ fontSize: 12, color: '#666' }}>Gastos</Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FF6B6B' }}>{formatCOPCompact(totalExpense)}</Text>
          </View>
        </View>
      </View>

      {/* Gastos por categoría */}
      <View style={{
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        margin: 16,
        marginTop: 0,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 16 }}>Gastos por categoría</Text>
        
        {categoryExpenses.length > 0 ? (
          categoryExpenses.map((cat, index) => (
            <View key={index} style={{ marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 14, color: colors.textPrimary }}>{cat.category}</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>{formatCOP(cat.amount)}</Text>
              </View>
              <View style={{ height: 8, backgroundColor: '#F0F0F0', borderRadius: 4, overflow: 'hidden' }}>
                <View style={{
                  width: `${cat.percentage}%`,
                  height: '100%',
                  backgroundColor: cat.color,
                  borderRadius: 4,
                }} />
              </View>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', color: '#999', padding: 20 }}>No hay gastos registrados</Text>
        )}
      </View>

      {/* Tendencia de gastos */}
      <View style={{
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        margin: 16,
        marginTop: 0,
        marginBottom: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 8 }}>Tendencia de gastos</Text>
        <Text style={{ fontSize: 12, color: '#999' }}>Últimos 6 meses</Text>
      </View>
      </>
      )}
    </ScrollView>
  );
};

export default ReportsScreen;