import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRANSACTIONS_API_BASE_URL } from "@env";

export interface TransactionRequest {
    amount: number;
    description: string;
    categoryId: number;
    date: string;
}

export interface TransactionResponse {
    id: number;
    amount: number;
    description: string;
    categoryId: number;
    date: string;
    type: string;
}

export interface IncomeResponse {
    id: number;
    amount: number;
    description: string;
    categoryId: number;
    date: string;
    createdAt: string;
}

export interface ExpenseResponse {
    id: number;
    amount: number;
    description: string;
    categoryId: number;
    date: string;
    createdAt: string;
}

export interface ReportsResponse {
    totalIncome: number;
    totalExpense: number;
}

class TransactionService {
    // Obtiene el encabezado con el token JWT almacenado
    static async getAuthHeader() {
        const token = await AsyncStorage.getItem("jwt");
        if (!token) throw new Error("No authentication token found");
        return { Authorization: `Bearer ${token}` };
    }

    // POST /api/transactions/expenses - Crea un gasto
    static async createExpense(data: TransactionRequest): Promise<ExpenseResponse> {
        const headers = await this.getAuthHeader();
        const url = `${TRANSACTIONS_API_BASE_URL}/transactions/expenses`;
        const response = await axios.post(url, data, { headers });
        return response.data;
    }

    // POST /api/transactions/incomes - Crea un ingreso
    static async createIncome(data: TransactionRequest): Promise<IncomeResponse> {
        const headers = await this.getAuthHeader();
        const url = `${TRANSACTIONS_API_BASE_URL}/transactions/incomes`;
        const response = await axios.post(url, data, { headers });
        return response.data;
    }

    // GET /api/transactions - Obtiene todas las transacciones
    static async getAllTransactions(): Promise<TransactionResponse[]> {
        const headers = await this.getAuthHeader();
        const url = `${TRANSACTIONS_API_BASE_URL}/transactions`;
        console.log('Fetching all transactions from:', url);
        const response = await axios.get(url, { headers });
        return response.data;
    }

    // DELETE /api/transactions/incomes/:id - Eliminar ingreso
    static async deleteIncome(id: number): Promise<void> {
        const headers = await this.getAuthHeader();
        const url = `${TRANSACTIONS_API_BASE_URL}/transactions/incomes/${id}`;
        console.log('Deleting income:', id);
        await axios.delete(url, { headers });
    }

    // DELETE /api/transactions/expenses/:id - Eliminar gasto
    static async deleteExpense(id: number): Promise<void> {
        const headers = await this.getAuthHeader();
        const url = `${TRANSACTIONS_API_BASE_URL}/transactions/expenses/${id}`;
        console.log('Deleting expense:', id);
        await axios.delete(url, { headers });
    }

    // GET /api/transactions/reports - Obtener reportes
    static async getReports(): Promise<ReportsResponse> {
        const headers = await this.getAuthHeader();
        const url = `${TRANSACTIONS_API_BASE_URL}/transactions/reports`;
        console.log('Fetching reports from:', url);
        const response = await axios.get(url, { headers });
        return response.data;
    }
}

export default TransactionService;