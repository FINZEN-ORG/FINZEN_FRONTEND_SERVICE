# Integración de Sugerencias de IA en Metas Financieras

## 📋 Descripción

Se ha integrado el servicio de IA de FINZEN para proporcionar sugerencias inteligentes y análisis de viabilidad en las metas financieras. Las sugerencias aparecen automáticamente cuando el usuario crea o visualiza una meta.

---

## 🎯 Funcionalidades Implementadas

### 1. **Creación de Meta con IA**
- **Ubicación**: `GoalsScreen.tsx` (Modal de creación)
- **Comportamiento**: 
  - Cuando el usuario completa los campos de nombre y monto objetivo, la IA analiza automáticamente la viabilidad de la meta
  - Se muestra un indicador de carga mientras la IA procesa
  - Las sugerencias aparecen en un card amarillo estilo "dashed border"
  - Incluye:
    - Mensaje de recomendación principal
    - Ahorro mensual sugerido (si aplica)
    - Tips adicionales
    - Advertencia si la meta no es viable

### 2. **Detalle de Meta con Sugerencias**
- **Ubicación**: `GoalDetailScreen.tsx`
- **Comportamiento**:
  - Al abrir el detalle de una meta, la IA analiza el progreso y da recomendaciones
  - Muestra sugerencias contextuales basadas en el estado actual de la meta
  - Ayuda a optimizar el plan de ahorro

---

## 🏗️ Componentes Creados

### **1. AIService.ts**
```typescript
// Ubicación: src/services/AIService.ts

Métodos principales:
- analyzeGoalViability(goalData): Analiza viabilidad de una meta
- getGoalSuggestions(): Obtiene sugerencias generales
- parseAIResponse(data): Procesa respuestas de la IA
```

**Endpoints utilizados:**
- `POST /analyze/goals` - Análisis de metas financieras

### **2. AISuggestionCard Component**
```typescript
// Ubicación: src/components/AISuggestionCard/

Props:
- recommendation: string | null - Mensaje principal de la IA
- loading: boolean - Estado de carga
- isViable: boolean - Si la meta es viable
- suggestedMonthlyAmount: number - Ahorro mensual sugerido
- tips: string[] - Tips adicionales
- style: any - Estilos personalizados
```

**Diseño:**
- 🎨 Fondo amarillo claro (#FFF8E7)
- ✨ Borde amarillo punteado (#FFD966)
- 💡 Ícono de sparkle (✨) en el encabezado
- 💰 Sección destacada para monto mensual
- ⚠️ Indicador de advertencia si no es viable

---

## 🔧 Configuración Requerida

### 1. Variables de Entorno

Agregar en tu archivo `.env`:

```env
AI_SERVICE_BASE_URL=http://localhost:8084
```

O para producción:
```env
AI_SERVICE_BASE_URL=https://your-ai-service-url.com
```

### 2. Declaración de Tipos

Ya incluido en `src/types/env.d.ts`:
```typescript
declare module '@env' {
  export const AI_SERVICE_BASE_URL: string;
  // ... otras variables
}
```

---

## 📡 Flujo de Integración

### **Flujo de Creación de Meta:**

```
1. Usuario ingresa datos de la meta
   ↓
2. useEffect detecta cambios (debounce 1 segundo)
   ↓
3. AIService.analyzeGoalViability() se ejecuta
   ↓
4. Request a POST /analyze/goals con datos de la meta
   ↓
5. IA analiza viabilidad y genera recomendación
   ↓
6. AISuggestionCard muestra la recomendación
   ↓
7. Usuario revisa y decide crear la meta
```

### **Flujo en Detalle de Meta:**

```
1. Usuario abre detalle de meta
   ↓
2. loadGoalDetail() carga información
   ↓
3. useEffect se activa cuando goal.id cambia
   ↓
4. AIService.analyzeGoalViability() analiza meta actual
   ↓
5. AISuggestionCard muestra recomendaciones contextuales
```

---

## 🎨 Ejemplos de Respuesta de IA

### Ejemplo 1: Meta Viable
```json
{
  "recommendation": "¡Excelente meta! Para alcanzar $10,000 en 12 meses, te sugerimos ahorrar $833 mensuales. Considera aumentar tu aporte mensual en $50 para alcanzar tu meta un mes antes.",
  "isViable": true,
  "suggestedMonthlyAmount": 833,
  "tips": [
    "Configura una transferencia automática el día 1 de cada mes",
    "Reduce gastos hormiga como café diario"
  ]
}
```

### Ejemplo 2: Meta Desafiante
```json
{
  "recommendation": "Esta meta es ambiciosa. Para $50,000 en 6 meses necesitarías ahorrar $8,333 mensuales. Considera extender el plazo a 12 meses ($4,166/mes) para mayor viabilidad.",
  "isViable": false,
  "suggestedMonthlyAmount": 4166,
  "warnings": ["El plazo es muy corto para el monto objetivo"]
}
```

---

## 🧪 Pruebas

### **Probar Localmente:**

1. **Iniciar el servicio de IA:**
```bash
cd FINZEN_IA_SERVICE
docker-compose up -d
```

2. **Verificar que el servicio esté corriendo:**
```bash
curl http://localhost:8084/health
```

3. **Configurar la variable de entorno en el frontend:**
```env
AI_SERVICE_BASE_URL=http://localhost:8084
```

4. **Ejecutar el frontend:**
```bash
cd FINZEN_FRONTEND_SERVICE
npm start
```

5. **Probar la integración:**
   - Abre la pantalla de "Mis Metas"
   - Toca "+ Nueva Meta"
   - Completa el nombre y monto
   - Espera 1 segundo → debe aparecer el card de sugerencias

---

## 🔍 Troubleshooting

### ❌ No aparecen las sugerencias

**Posibles causas:**
1. El servicio de IA no está corriendo
2. La variable `AI_SERVICE_BASE_URL` no está configurada
3. El token de autenticación no es válido

**Solución:**
```bash
# Verificar servicio de IA
curl http://localhost:8084/health

# Verificar variable de entorno
echo $AI_SERVICE_BASE_URL

# Ver logs del contenedor
docker logs finzen-api-ai
```

### ⚠️ Error de CORS

Si ves errores de CORS, asegúrate de que el backend de IA permita requests desde el frontend:

```python
# En main.py del servicio de IA
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción: especificar dominios
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 🐌 Sugerencias muy lentas

Las sugerencias se generan con un debounce de 1 segundo para evitar múltiples llamadas. Si quieres ajustar este tiempo:

```typescript
// En GoalsScreen.tsx, línea del setTimeout
setTimeout(async () => {
  // ... código
}, 500); // Cambiar a 500ms para respuesta más rápida
```

---

## 📚 Documentación Adicional

- [Documentación del Servicio de IA](../FINZEN_IA_SERVICE/README.md)
- [API Reference](../FINZEN_IA_SERVICE/docs/api.md)
- [Guía de Componentes](./src/components/README.md)

---

## 🚀 Próximos Pasos

- [ ] Implementar caché de sugerencias para mejorar rendimiento
- [ ] Agregar histórico de sugerencias de IA
- [ ] Implementar sugerencias proactivas basadas en comportamiento
- [ ] Agregar feedback del usuario sobre calidad de sugerencias
- [ ] Implementar sugerencias en pantalla de presupuestos

---

## 👥 Contribuciones

Para contribuir a esta integración:

1. Revisa el código en `src/services/AIService.ts`
2. Sigue los patrones establecidos
3. Actualiza esta documentación si haces cambios significativos
4. Prueba exhaustivamente antes de hacer commit

---

**Última actualización:** Diciembre 2025  
**Versión:** 1.0.0  
**Mantenedor:** FinZen Team
