import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { globalStyles } from '../../styles';
import { colors } from '../../styles/colors';
import useReports from './useReports';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import { formatCOPCompact } from '../../utils/formatCurrency';

const ReportsScreen: React.FC = () => {
  const { loading, refreshing, onRefresh, totalIncome, totalExpense, categoryExpenses, balance } = useReports();
  const [selectedPeriod] = useState('Histórico'); // Por ahora es histórico global

  if (loading && !refreshing) {
    return (
        <View style={[globalStyles.screenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
  }

  const hasData = totalIncome > 0 || totalExpense > 0;
  const totalFlow = totalIncome + totalExpense;

  // Evitar división por cero
  const incomePct = totalFlow > 0 ? (totalIncome / totalFlow) * 100 : 0;
  const expensePct = totalFlow > 0 ? (totalExpense / totalFlow) * 100 : 0;

  // Configuración Dona SVG
  const size = 200;
  const strokeWidth = 20;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Cálculos de arcos
  const incomeStrokeDash = (incomePct / 100) * circumference;
  const expenseStrokeDash = (expensePct / 100) * circumference;

  // Rotación para que empiece arriba
  const rotation = -90;

  return (
      <ScrollView
          style={globalStyles.screenContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={{ padding: 20, paddingBottom: 10 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.textPrimary }}>Reportes</Text>
          <Text style={{ color: colors.textSecondary }}>Resumen financiero</Text>
        </View>

        {!hasData ? (
            <View style={{ alignItems: 'center', marginTop: 50, padding: 20 }}>
              <Text style={{ fontSize: 40, marginBottom: 10 }}>📉</Text>
              <Text style={{ color: '#666', textAlign: 'center' }}>
                No hay transacciones registradas aún.
              </Text>
            </View>
        ) : (
            <>
              {/* Tarjeta de Balance y Gráfico */}
              <View style={{
                backgroundColor: 'white', margin: 16, borderRadius: 16, padding: 20,
                elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5
              }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                  <View>
                    <Text style={{ color: '#666', fontSize: 12 }}>Balance Total</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: balance >= 0 ? colors.success : colors.expense }}>
                      {formatCOPCompact(balance)}
                    </Text>
                  </View>
                  <View style={{ backgroundColor: '#F0F0F0', padding: 5, borderRadius: 8 }}>
                    <Text style={{ fontSize: 12, color: '#666' }}>{selectedPeriod}</Text>
                  </View>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Svg width={size} height={size}>
                    <G rotation={rotation} origin={`${center}, ${center}`}>
                      {/* Fondo gris completo */}
                      <Circle cx={center} cy={center} r={radius} stroke="#F0F0F0" strokeWidth={strokeWidth} fill="none" />

                      {/* Arco de Ingresos (Verde) */}
                      {incomePct > 0 && (
                          <Circle
                              cx={center} cy={center} r={radius}
                              stroke={colors.success} strokeWidth={strokeWidth} fill="none"
                              strokeDasharray={`${incomeStrokeDash} ${circumference}`}
                              strokeLinecap="round"
                          />
                      )}

                      {/* Arco de Gastos (Rojo) - empieza donde termina el verde */}
                      {expensePct > 0 && (
                          <Circle
                              cx={center} cy={center} r={radius}
                              stroke={colors.expense} strokeWidth={strokeWidth} fill="none"
                              strokeDasharray={`${expenseStrokeDash} ${circumference}`}
                              strokeDashoffset={-incomeStrokeDash}
                              strokeLinecap="round"
                          />
                      )}
                    </G>
                    {/* Texto Central */}
                    <SvgText x={center} y={center - 10} textAnchor="middle" fontSize="12" fill="#999">Flujo Total</SvgText>
                    <SvgText x={center} y={center + 15} textAnchor="middle" fontSize="18" fontWeight="bold" fill={colors.textPrimary}>
                      {formatCOPCompact(totalFlow)}
                    </SvgText>
                  </Svg>
                </View>

                {/* Leyenda Simple */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, gap: 20 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.success }} />
                    <Text style={{ color: '#666' }}>Ingresos ({incomePct.toFixed(0)}%)</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.expense }} />
                    <Text style={{ color: '#666' }}>Gastos ({expensePct.toFixed(0)}%)</Text>
                  </View>
                </View>
              </View>

              {/* Lista de Gastos por Categoría */}
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginBottom: 10, color: colors.textPrimary }}>
                Gastos por Categoría
              </Text>

              <View style={{ paddingHorizontal: 16, paddingBottom: 30 }}>
                {categoryExpenses.map((cat, index) => (
                    <View key={index} style={{ marginBottom: 15 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <Text style={{ fontWeight: '600', color: '#444' }}>{cat.category}</Text>
                        <Text style={{ fontWeight: 'bold', color: '#444' }}>{formatCOPCompact(cat.amount)}</Text>
                      </View>
                      <View style={{ height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, overflow: 'hidden' }}>
                        <View style={{
                          width: `${cat.percentage}%`,
                          height: '100%',
                          backgroundColor: cat.color
                        }} />
                      </View>
                      <Text style={{ fontSize: 10, color: '#999', textAlign: 'right', marginTop: 2 }}>
                        {cat.percentage.toFixed(1)}%
                      </Text>
                    </View>
                ))}
              </View>
            </>
        )}
      </ScrollView>
  );
};

export default ReportsScreen;