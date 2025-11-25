import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { dashboardStyles } from './Dashboard.Style';
import useDashboard from './useDashboard';
import { FloatingActionButton } from '../../components';
import { useNavigation } from '@react-navigation/native';

const Dashboard: React.FC = () => {
    const navigation = useNavigation<any>();
    const { user, transactions, loading, refreshing, totalIncome, totalExpense, onRefresh, onLogoutPress } = useDashboard();
    const [showFloatingMenu, setShowFloatingMenu] = useState(false);

    if (loading && !refreshing) {
        return (
            <View style={[dashboardStyles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color="#6C5CE7" />
            </View>
        );
    }

    const balance = totalIncome - totalExpense;

    return (
        <View style={{ flex: 1, backgroundColor: '#e9efe9ff' }}>
            <ScrollView
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }} // Espacio para el FAB
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={dashboardStyles.header}>
                    <Text style={dashboardStyles.welcomeText}>¡Bienvenido! 🎉</Text>
                    <Text style={dashboardStyles.userName}>{user?.name}</Text>
                </View>

                {/* Balance Card */}
                <View style={{
                    padding: 20,
                    backgroundColor: balance >= 0 ? '#6C5CE7' : '#FF6B6B',
                    borderRadius: 12,
                    elevation: 4,
                    marginBottom: 20
                }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Balance Total</Text>
                    <Text style={{ color: '#fff', fontSize: 36, fontWeight: 'bold', marginVertical: 8 }}>
                        ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </Text>
                </View>

                {/* Resumen Ingresos/Gastos */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                    <View style={{ flex: 0.48, backgroundColor: '#00D084', padding: 15, borderRadius: 12 }}>
                        <Text style={{ color: 'white', fontSize: 12 }}>Ingresos</Text>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                            ${totalIncome.toLocaleString()}
                        </Text>
                    </View>
                    <View style={{ flex: 0.48, backgroundColor: '#FF6B6B', padding: 15, borderRadius: 12 }}>
                        <Text style={{ color: 'white', fontSize: 12 }}>Gastos</Text>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                            ${totalExpense.toLocaleString()}
                        </Text>
                    </View>
                </View>

                {/* Transacciones Recientes */}
                <Text style={dashboardStyles.sectionTitle}>Transacciones Recientes</Text>
                {transactions.slice(0, 5).map((t) => (
                    <View key={t.id} style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                        backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10
                    }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', color: '#333' }}>{t.description}</Text>
                            <Text style={{ fontSize: 12, color: '#888' }}>{new Date(t.date).toLocaleDateString()}</Text>
                        </View>
                        <Text style={{
                            fontWeight: 'bold',
                            color: t.type === 'INCOME' ? '#00D084' : '#FF6B6B'
                        }}>
                            {t.type === 'INCOME' ? '+' : '-'}${t.amount.toLocaleString()}
                        </Text>
                    </View>
                ))}

                <TouchableOpacity style={dashboardStyles.logoutButton} onPress={onLogoutPress}>
                    <Text style={dashboardStyles.logoutButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Menú Flotante solo en Dashboard */}
            <FloatingActionButton
                isMenuOpen={showFloatingMenu}
                onToggleMenu={() => setShowFloatingMenu(!showFloatingMenu)}
                onCreateCategory={() => { /* No acción en Dashboard */ }}
                onAddExpense={() => { setShowFloatingMenu(false); navigation.navigate('AddExpense'); }}
                onAddIncome={() => { setShowFloatingMenu(false); navigation.navigate('AddIncome'); }}
            />
        </View>
    );
};

export default Dashboard;