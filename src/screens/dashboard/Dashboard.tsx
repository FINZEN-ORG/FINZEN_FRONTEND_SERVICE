/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { dashboardStyles } from './Dashboard.Style';
import useDashboard from './useDashboard';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
    const { user, transactions, loading, refreshing, totalIncome, totalExpense, onRefresh, onLogoutPress } = useDashboard();

    // ✅ AHORA SÍ, después de todos los hooks, verificar user
    if (!user) {
        return (
            <View style={dashboardStyles.container}>
                <ActivityIndicator size="large" color="#6C5CE7" />
            </View>
        );
    }

    const balance = totalIncome - totalExpense;

    return (
        <ScrollView
            style={dashboardStyles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={dashboardStyles.header}>
                <Text style={dashboardStyles.welcomeText}>¡Bienvenido! 🎉</Text>
                <Text style={dashboardStyles.userName}>{user.name}</Text>
            </View>

            {loading ? (
                <View style={{ padding: 40 }}>
                    <ActivityIndicator size="large" color="#6C5CE7" />
                </View>
            ) : (
                <>
                    {/* Balance Card */}
                    <View style={{
                        padding: 20,
                        backgroundColor: balance >= 0 ? '#6C5CE7' : '#FF6B6B',
                        margin: 16,
                        borderRadius: 12,
                        elevation: 4,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                    }}>
                        <Text style={{ color: '#fff', fontSize: 16, marginBottom: 8 }}>Balance Total</Text>
                        <Text style={{ color: '#fff', fontSize: 36, fontWeight: 'bold' }}>
                            ${balance.toFixed(2)}
                        </Text>
                        <Text style={{ color: '#fff', fontSize: 12, marginTop: 4, opacity: 0.8 }}>
                            {balance >= 0 ? 'Saldo positivo' : 'Saldo negativo'}
                        </Text>
                    </View>

                    {/* Income/Expense Summary */}
                    <View style={{ flexDirection: 'row', padding: 16 }}>
                        <View style={{
                            flex: 1,
                            backgroundColor: '#00D084',
                            padding: 16,
                            borderRadius: 12,
                            marginRight: 8,
                            elevation: 2
                        }}>
                            <Text style={{ color: '#fff', fontSize: 14 }}>Ingresos</Text>
                            <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>
                                ${totalIncome.toFixed(2)}
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            backgroundColor: '#FF6B6B',
                            padding: 16,
                            borderRadius: 12,
                            marginLeft: 8,
                            elevation: 2
                        }}>
                            <Text style={{ color: '#fff', fontSize: 14 }}>Gastos</Text>
                            <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>
                                ${totalExpense.toFixed(2)}
                            </Text>
                        </View>
                    </View>

                    {/* Recent Transactions */}
                    <View style={{ padding: 16 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
                            Transacciones Recientes
                        </Text>
                        {transactions.length === 0 ? (
                            <Text style={{ textAlign: 'center', color: '#999', padding: 20 }}>
                                No hay transacciones registradas
                            </Text>
                        ) : (
                            transactions.slice(0, 10).map((transaction) => (
                                <View key={`${transaction.type}-${transaction.id}`} style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 12,
                                    backgroundColor: '#f5f5f5',
                                    marginBottom: 8,
                                    borderRadius: 8
                                }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontWeight: '600' }}>{transaction.description}</Text>
                                        <Text style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                                            {new Date(transaction.date).toLocaleDateString()}
                                        </Text>
                                    </View>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 16,
                                        color: transaction.type === 'INCOME' ? '#00D084' : '#FF6B6B'
                                    }}>
                                        {transaction.type === 'INCOME' ? '+' : '-'}${transaction.amount.toFixed(2)}
                                    </Text>
                                </View>
                            ))
                        )}
                    </View>
                </>
            )}

            <View style={dashboardStyles.footer}>
                <TouchableOpacity
                    style={dashboardStyles.logoutButton}
                    onPress={onLogoutPress}
                >
                    <Text style={dashboardStyles.logoutButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Dashboard;