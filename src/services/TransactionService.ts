import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRANSACTIONS_API_BASE_URL } from "@env";

// Request para crear ingreso o gasto
export interface TransactionRequest {
    amount: number;
    description: string;
    categoryId: number;
    date: string;
}

export interface TransactionResponse{
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

class TransactionService {
    // Obtiene el encabezado con el token JWT almacenado
    static async getAuthHeader() {
        const token = await AsyncStorage.getItem("jwt");
        if (!token) throw new Error("No authentication token found");
        return { Authorization: `Bearer ${token}` };
    }

    // Crea un gasto
    static async createExpense(data: TransactionRequest): Promise<ExpenseResponse> {
        const headers = await this.getAuthHeader();
        const url = `${TRANSACTIONS_API_BASE_URL}/transactions/expenses`;
        const response = await axios.post(url, data, { headers });
        return response.data;
    }

    // Crea un ingreso
    static async createIncome(data: TransactionRequest): Promise<IncomeResponse> {
        const headers = await this.getAuthHeader();
        const url = `${TRANSACTIONS_API_BASE_URL}/transactions/incomes`;
        const response = await axios.post(url, data, { headers });
        return response.data;
    }

    // Obtiene todas las transacciones del usuario autenticado
    static async getAllTransactions(): Promise<TransactionResponse[]> {
        const headers = await this.getAuthHeader();
        const url = `${TRANSACTIONS_API_BASE_URL}/transactions`;
        const response = await axios.get(url, { headers });
        return response.data;
    }
}

export default TransactionService;