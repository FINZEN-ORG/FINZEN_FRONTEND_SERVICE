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

class AIService {
    static async getAuthHeader() {
        const token = await AsyncStorage.getItem("jwt");
        if (!token) throw new Error("No authentication token found");
        return { Authorization: `Bearer ${token}` };
    }

    // Helper para obtener el ID de usuario almacenado por AuthContext
    private static async getUserId(): Promise<number> {
        try {
            const idStr = await AsyncStorage.getItem("@finzen_user_id");
            // Si no hay ID, retornamos 0 o lanzamos error (el backend requiere un int)
            return idStr ? parseInt(idStr, 10) : 0;
        } catch (e) {
            console.warn("Could not retrieve user ID for AI service", e);
            return 0;
        }
    }

    /**
     * Solicita análisis de viabilidad de una meta a la IA
     */
    static async analyzeGoalViability(goalData: GoalAnalysisInput): Promise<AIRecommendation> {
        try {
            const headers = await this.getAuthHeader();
            const userId = await this.getUserId();
            const url = `${AI_SERVICE_BASE_URL}/analyze`;

            // FIX: Estructura exacta que espera AgentInput en Python (snake_case)
            const payload = {
                user_id: userId,
                user_query: `Evaluar viabilidad meta: "${goalData.name}". Monto: ${goalData.targetAmount}, Categoría: ${goalData.category}, Fecha: ${goalData.dueDate || 'No definida'}`,
                context: "financial_advisor",
                goals: [], // El backend los cargará con el token si están vacíos
                transactions: [],
                financial_context: null
            };

            const response = await axios.post(url, payload, { headers });

            // La respuesta del backend es AgentOutput { action, message, data: {...} }
            const resultData = response.data?.data || {};

            // Mapeamos la respuesta estructurada del backend (GoalAnalyzer._evaluate_goal)
            return {
                message: resultData.message || response.data?.message || "Análisis completado",
                isViable: resultData.viable !== false, // Default to true if undefined
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

    /**
     * Solicita recomendaciones sobre metas existentes
     */
    static async getGoalSuggestions(): Promise<string[]> {
        try {
            const headers = await this.getAuthHeader();
            const userId = await this.getUserId();
            // FIX: Usar /analyze, no /analyze/goals
            const url = `${AI_SERVICE_BASE_URL}/analyze`;

            const payload = {
                user_id: userId,
                user_query: "sugerir nuevas metas financieras", // Trigger para GoalAnalyzer._suggest_goals
                context: "friendly"
            };

            const response = await axios.post(url, payload, { headers });
            const resultData = response.data?.data || {};

            // Backend devuelve lista de objetos en 'suggested_goals'
            if (resultData.suggested_goals && Array.isArray(resultData.suggested_goals)) {
                return resultData.suggested_goals.map((g: any) =>
                    `${g.name}: ${g.reason} (Objetivo: $${g.estimated_target})`
                );
            }

            return [resultData.message || "Sigue ahorrando constantemente."];

        } catch (error) {
            console.error("Error getting AI suggestions:", error);
            return [];
        }
    }

    /**
     * Solicita sugerencia de nueva meta
     */
    static async suggestNewGoal(): Promise<string | null> {
        try {
            const headers = await this.getAuthHeader();
            const userId = await this.getUserId();
            const url = `${AI_SERVICE_BASE_URL}/analyze`;

            const payload = {
                user_id: userId,
                user_query: "sugerir una meta nueva específica", // Trigger para sugerencias
                context: "motivator"
            };

            const response = await axios.post(url, payload, { headers });
            const resultData = response.data?.data || {};

            // Si el backend devuelve sugerencias estructuradas, construimos el texto
            // para que GoalsScreen lo pueda parsear con sus regex actuales
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
}

export default AIService;