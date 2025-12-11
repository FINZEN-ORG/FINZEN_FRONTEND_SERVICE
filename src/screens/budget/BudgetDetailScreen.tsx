import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { HeaderWithBack, ExpensesList } from '../../components';
import { globalStyles, colors } from '../../styles';
import TransactionService from '../../services/TransactionService';
import BudgetService from '../../services/BudgetService';

const BudgetDetailScreen: React.FC = () => {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { budgetId, categoryId, categoryName, limit, spent } = route.params; // Recibimos datos
    const [expenses, setExpenses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadExpenses = async () => {
            try {
                // Aquí lo ideal sería un endpoint filtrado en backend: /transactions?categoryId=X
                // Por ahora traemos todas y filtramos en cliente (MVP)
                const all = await TransactionService.getAllTransactions();
                const filtered = all.filter((t: any) => t.categoryId === categoryId && t.type === 'EXPENSE');

                // Mapear para ExpensesList
                const mapped = filtered.map((t: any) => ({
                    id: t.id,
                    categoryIcon: '💸', // O busca el icono si tienes la lista de categorias a mano
                    description: t.description,
                    amount: t.amount,
                    date: new Date(t.date).toISOString().split('T')[0],
                    category: categoryName
                }));
                setExpenses(mapped);
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        };
        loadExpenses();
    }, [categoryId, categoryName]);

    // --- LÓGICA DE ELIMINAR ---
    const handleDeleteBudget = () => {
        Alert.alert(
            "Eliminar Presupuesto",
            "¿Estás seguro? Esto eliminará el límite establecido, pero tus gastos históricos se mantendrán.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await BudgetService.deleteBudget(budgetId);
                            Alert.alert("Éxito", "Presupuesto eliminado.");
                            navigation.goBack(); // Volver a la lista
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar el presupuesto.");
                        }
                    }
                }
            ]
        );
    };

    // Componente del botón de basura
    const TrashButton = (
        <TouchableOpacity onPress={handleDeleteBudget} style={{ padding: 5 }}>
            <Text style={{ fontSize: 24 }}>🗑️</Text>
        </TouchableOpacity>
    );

    return (
        <View style={globalStyles.screenContainer}>
            <HeaderWithBack
                title={categoryName}
                onBackPress={() => navigation.goBack()}
                rightComponent={TrashButton} // <--- AQUÍ ESTÁ LA MAGIA
            />

            <View style={{ padding: 20, backgroundColor: 'white', margin: 20, borderRadius: 12, elevation: 2 }}>
                <Text style={{color:'#666'}}>Presupuesto Mensual</Text>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: colors.textPrimary}}>${limit.toLocaleString()}</Text>

                <View style={{flexDirection:'row', alignItems:'center', marginTop: 10}}>
                    <Text style={{flex: 1, color: spent > limit ? colors.expense : colors.success, fontWeight:'bold'}}>
                        Gastado: ${spent.toLocaleString()}
                    </Text>
                    <Text style={{fontWeight:'bold', color: '#666'}}>
                        {Math.round((spent/limit)*100)}%
                    </Text>
                </View>

                {/* Barra */}
                <View style={{ height: 8, backgroundColor: '#EEE', borderRadius: 4, marginTop: 5, overflow:'hidden' }}>
                    <View style={{
                        width: `${Math.min((spent/limit) * 100, 100)}%`,
                        height: '100%',
                        backgroundColor: spent > limit ? colors.expense : colors.secondary
                    }} />
                </View>
            </View>

            <View style={{flex: 1}}>
                <Text style={{marginLeft: 20, fontWeight:'bold', marginBottom: 10, color: colors.textPrimary}}>
                    Historial de Gastos
                </Text>
                {loading ? <ActivityIndicator color={colors.primary} /> : (
                    expenses.length > 0 ? (
                        <ExpensesList expenses={expenses} onExpensePress={() => {}} />
                    ) : (
                        <Text style={{textAlign:'center', marginTop: 20, color:'#999'}}>No hay gastos registrados en esta categoría.</Text>
                    )
                )}
            </View>
        </View>
    );
};
export default BudgetDetailScreen;