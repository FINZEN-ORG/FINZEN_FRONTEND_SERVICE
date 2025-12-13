import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AI_SERVICE_BASE_URL } from "@env";

export interface GoalAnalysisInput {
    name: string;
    targetAmount: number;
    category: string;
    dueDate?: string;
    description?: string;
}

export interface AIRecommendation {
    message: string;
    isViable: boolean;
    suggestedMonthlyAmount?: number;
    warnings?: string[];
    tips?: string[];
}

export interface BudgetSuggestion {
    suggested_amount: number;
    start_date: string;
    end_date: string;
    description: string;
    tip: string;
    error?: string;
}

export interface BudgetReview {
    status: "bien" | "regular" | "mal";
    tips: string[];
    analysis: string;
    patterns: string[];
    suggested_changes: string[];
    error?: string;
}

class AIService {
    static async getAuthHeader() {
        const token = await AsyncStorage.getItem("jwt");
        if (!token) throw new Error("No authentication token found");
        return { Authorization: `Bearer ${token}` };
    }

    private static async getUserId(): Promise<string> {
        try {
            const idStr = await AsyncStorage.getItem("@finzen_user_id");
            return idStr || "0";
        } catch (e) {
            console.warn("Could not retrieve user ID for AI service", e);
            return "0";
        }
    }

    static async createSemanticProfile(profileAttributes: any): Promise<boolean> {
        try {
            const headers = await this.getAuthHeader();
            const userId = await this.getUserId(); // Retorna string, el backend espera int en el json body pero string en el ID logic

            const url = `${AI_SERVICE_BASE_URL}/profile`;

            const payload = {
                user_id: parseInt(userId),
                attributes: profileAttributes
            };

            console.log('🧠 Enviando perfil semántico a IA:', payload);
            await axios.post(url, payload, { headers });
            return true;
        } catch (error) {
            console.error("Error creating semantic profile:", error);
            return false;
        }
    }

    static async analyzeGoalViability(goalData: GoalAnalysisInput): Promise<AIRecommendation> {
        try {
            const headers = await this.getAuthHeader();
            const userId = await this.getUserId();
            const url = `${AI_SERVICE_BASE_URL}/analyze`;

            const payload = {
                user_id: userId,
                user_query: `Evaluar viabilidad meta: "${goalData.name}". Monto: ${goalData.targetAmount}, Categoría: ${goalData.category}, Fecha: ${goalData.dueDate || 'No definida'}`,
                context: "financial_advisor",
                goals: [],
                transactions: [],
                financial_context: null
            };

            const response = await axios.post(url, payload, { headers });
            const resultData = response.data?.data || {};

            return {
                message: resultData.message || response.data?.message || "Análisis completado",
                isViable: resultData.viable !== false,
                suggestedMonthlyAmount: resultData.suggested_adjustments?.monthly_contribution,
                tips: resultData.alternative_approach ? [resultData.alternative_approach] : []
            };
        } catch (error: any) {
            console.error("Error analyzing goal with AI:", error.response?.data || error.message);
            return {
                message: "No se pudo conectar con el servicio de IA.",
                isViable: true,
                warnings: ["Servicio de IA no disponible"]
            };
        }
    }

    static async suggestNewGoal(): Promise<string | null> {
        try {
            const headers = await this.getAuthHeader();
            const userId = await this.getUserId();
            const url = `${AI_SERVICE_BASE_URL}/analyze`;

            const payload = {
                user_id: userId,
                user_query: "sugerir una meta nueva específica",
                context: "motivator"
            };

            const response = await axios.post(url, payload, { headers });
            const resultData = response.data?.data || {};

            if (resultData.suggested_goals && resultData.suggested_goals.length > 0) {
                const goal = resultData.suggested_goals[0];
                return `¡Hola! Te sugiero esta meta: Ahorra para tu ${goal.name}. Te sugerimos un monto de $${goal.estimated_target} para la categoría ${goal.category}. ${goal.reason}`;
            }

            return resultData.message || response.data?.message || null;
        } catch (error) {
            console.error("Error getting new goal suggestion:", error);
            return null;
        }
    }

    static async suggestBudget(
        categoryId: number,
        categoryName?: string,
        startDate?: string,
        endDate?: string
    ): Promise<BudgetSuggestion | null> {
        try {
            const headers = await this.getAuthHeader();
            const userId = await this.getUserId();
            const url = `${AI_SERVICE_BASE_URL}/budget/suggest`;

            // Si no hay fechas, usar mes actual
            const now = new Date();
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

            const defaultStartDate = firstDay.toISOString().split('T')[0];
            const defaultEndDate = lastDay.toISOString().split('T')[0];

            const payload = {
                user_id: userId,
                category_id: categoryId,
                category_name: categoryName || "General",
                start_date: startDate || defaultStartDate,
                end_date: endDate || defaultEndDate,
                transactions: null,
                financial_context: null,
                semantic_profile: null
            };

            console.log('🤖 Solicitando sugerencia de presupuesto:', {
                categoryId,
                categoryName,
                period: `${payload.start_date} a ${payload.end_date}`
            });

            const response = await axios.post(url, payload, { headers });

            console.log('✅ Respuesta de IA:', response.data);

            return response.data as BudgetSuggestion;
        } catch (error: any) {
            console.error("Error suggesting budget:", error.response?.data || error.message);
            return null;
        }
    }

    static async reviewBudget(budget: {
        id: number;
        categoryId: number;
        amount: number;
        startDate: string;
        endDate: string;
    }): Promise<BudgetReview | null> {
        try {
            const headers = await this.getAuthHeader();
            const userId = await this.getUserId();
            const url = `${AI_SERVICE_BASE_URL}/budget/review`;

            const payload = {
                user_id: userId,
                budget: {
                    category_id: budget.categoryId,
                    amount: budget.amount,
                    start_date: budget.startDate,
                    end_date: budget.endDate
                },
                transactions: null,
                financial_context: null,
                semantic_profile: null
            };

            console.log('🔍 Solicitando revisión de presupuesto:', budget);

            const response = await axios.post(url, payload, { headers });

            console.log('✅ Análisis recibido:', response.data);

            return response.data as BudgetReview;
        } catch (error: any) {
            console.error("Error reviewing budget:", error.response?.data || error.message);
            return null;
        }
    }
}

export default AIService;