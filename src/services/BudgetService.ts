import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TRANSACTIONS_API_BASE_URL } from "@env";

export interface BudgetDto {
    id?: number;
    categoryId: number;
    amount: number;
    initialAmount: number;
    startDate?: string;
    endDate?: string;
}

class BudgetService {
    static async getAuthHeader() {
        const token = await AsyncStorage.getItem("jwt");
        if (!token) throw new Error("No authentication token found");
        return { Authorization: `Bearer ${token}` };
    }

    // GET /api/budgets - Obtener todos los presupuestos
    static async getAllBudgets(): Promise<BudgetDto[]> {
        const headers = await this.getAuthHeader();
        const url = `${TRANSACTIONS_API_BASE_URL}/budgets`;
        console.log('📥 Fetching budgets from:', url);
        const response = await axios.get(url, { headers });
        return response.data;
    }

    // POST /api/budgets - Crear o actualizar presupuesto
    static async createOrUpdateBudget(data: BudgetDto): Promise<BudgetDto> {
        const headers = await this.getAuthHeader();
        const url = `${TRANSACTIONS_API_BASE_URL}/budgets`;
        console.log('📤 Creating/updating budget:', data);
        const response = await axios.post(url, data, { headers });
        return response.data;
    }
}

export default BudgetService;