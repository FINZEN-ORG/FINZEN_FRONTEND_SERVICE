import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { HeaderWithBack, ExpensesList, ScreenTitle } from '../../components';
import { globalStyles } from '../../styles';
import TransactionService from '../../services/TransactionService';

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

    return (
        <View style={globalStyles.screenContainer}>
            <HeaderWithBack title={categoryName} onBackPress={() => navigation.goBack()} />

            <View style={{ padding: 20, backgroundColor: 'white', margin: 20, borderRadius: 12, elevation: 2 }}>
                <Text style={{color:'#666'}}>Presupuesto Mensual</Text>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>${limit}</Text>
                <Text style={{marginTop: 5, color: spent > limit ? 'red' : 'green'}}>
                    Gastado: ${spent} ({Math.round((spent/limit)*100)}%)
                </Text>
            </View>

            <View style={{flex: 1}}>
                <Text style={{marginLeft: 20, fontWeight:'bold', marginBottom: 10}}>Historial de Gastos</Text>
                {loading ? <ActivityIndicator /> : (
                    <ExpensesList expenses={expenses} onExpensePress={() => {}} />
                )}
            </View>
        </View>
    );
};
export default BudgetDetailScreen;