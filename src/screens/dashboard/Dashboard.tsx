import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dashboardStyles } from './Dashboard.Style';
import useDashboard from './useDashboard';
import { FloatingActionButton, MotivationalMessage } from '../../components';
import { useNavigation } from '@react-navigation/native';
import IoniconsIcon from '@react-native-vector-icons/ionicons';

const Dashboard: React.FC = () => {
    const navigation = useNavigation<any>();
    const { user, transactions, loading, refreshing, totalIncome, totalExpense, onRefresh, onLogoutPress } = useDashboard();
    const [showFloatingMenu, setShowFloatingMenu] = useState(false);

    if (loading && !refreshing) {
        return (
            <View style={[dashboardStyles.container, { justifyContent: 'center', backgroundColor: '#EAFFF2' }]}>
                <ActivityIndicator size="large" color="#6C5CE7" />
            </View>
        );
    }

    const balance = totalIncome - totalExpense;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#EAFFF2' }} edges={["bottom","left","right"]}>
            <View style={{ padding: 16, paddingTop: 10, paddingBottom: 0 }}>
                {/* Botón de usuario arriba a la derecha */}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 12 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Settings')}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 2,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 3,
                        }}
                    >
                        <IoniconsIcon name="person" size={22} color="#00c66d" />
                    </TouchableOpacity>
                </View>

                {/* Mensaje Alentador */}
                <MotivationalMessage />

                {/* Balance Card */}
                <View style={{
                    padding: 16,
                    backgroundColor: balance >= 0 ? '#00A654' : '#FF6B6B',
                    borderRadius: 12,
                    elevation: 4,
                    marginBottom: 16
                }}>
                    <Text style={{ color: '#fff', fontSize: 14 }}>Balance Total</Text>
                    <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold', marginVertical: 6 }}>
                        ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </Text>
                </View>

                {/* Resumen Ingresos/Gastos */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                    <View style={{ flex: 0.48, backgroundColor: '#00D084', padding: 12, borderRadius: 12 }}>
                        <Text style={{ color: 'white', fontSize: 11 }}>Ingresos</Text>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                            ${totalIncome.toLocaleString()}
                        </Text>
                    </View>
                    <View style={{ flex: 0.48, backgroundColor: '#FF6B6B', padding: 12, borderRadius: 12 }}>
                        <Text style={{ color: 'white', fontSize: 11 }}>Gastos</Text>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                            ${totalExpense.toLocaleString()}
                        </Text>
                    </View>
                </View>

                {/* Transacciones Recientes */}
                <Text style={dashboardStyles.sectionTitle}>Transacciones Recientes</Text>
            </View>

            <ScrollView
                style={{ flex: 1, paddingHorizontal: 16 }}
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
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
            </ScrollView>

            {/* Menú Flotante solo en Dashboard */}
            <FloatingActionButton
                isMenuOpen={showFloatingMenu}
                onToggleMenu={() => setShowFloatingMenu(!showFloatingMenu)}
                onCreateCategory={() => { setShowFloatingMenu(false); navigation.navigate('NewCategory'); }}
                onAddExpense={() => { setShowFloatingMenu(false); navigation.navigate('AddExpense'); }}
                onAddIncome={() => { setShowFloatingMenu(false); navigation.navigate('AddIncome'); }}
            />
        </SafeAreaView>
    );
};

export default Dashboard;