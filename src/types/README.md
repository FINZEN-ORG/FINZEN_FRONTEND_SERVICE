# Types Folder

Esta carpeta contiene todas las definiciones de tipos TypeScript utilizadas en la aplicación.

## ✅ Archivos de tipos actuales

- **env.d.ts** - Declaraciones de variables de entorno
- **images.d.ts** - Declaraciones para imports de imágenes
- **navigation.ts** - Tipos de navegación (AuthStack, AppStack)
- **index.ts** - Exporta todos los tipos de manera centralizada

## 📁 Estructura organizada

```
types/
├── env.d.ts          # Variables de entorno
├── images.d.ts       # Imports de imágenes
├── navigation.ts     # ✅ Tipos de navegación
├── index.ts          # ✅ Exportador central
└── README.md         # Esta documentación
```

## 🧩 Tipos de navegación implementados

### AuthStack (Pantallas sin autenticación)
```typescript
export type AuthStackParamList = {
  Login: undefined;
  // Futuras pantallas:
  // Register: undefined;
  // ForgotPassword: undefined;
};
```

### AppStack (Pantallas autenticadas)
```typescript
export type AppStackParamList = {
  Dashboard: undefined;
  // Futuras pantallas:
  // Profile: undefined;
  // Settings: undefined;
  // Transactions: undefined;
};
```

### Tipo combinado
```typescript
export type RootStackParamList = AuthStackParamList & AppStackParamList;
```

## 🚀 Cómo usar los tipos

### Importación simple desde index
```typescript
import { AuthStackParamList, AppStackParamList } from '../types';
```

### En navegación
```typescript
import { AppStackParamList } from '../types';

const Stack = createStackNavigator<AppStackParamList>();
```

### Para componentes de pantalla
```typescript
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../types';

type LoginScreenProps = {
  route: RouteProp<AuthStackParamList, 'Login'>;
};
```

## 📋 Futuras extensiones

### Para agregar nuevas pantallas:
```typescript
// En navigation.ts
export type AppStackParamList = {
  Dashboard: undefined;
  Profile: undefined;           // ← Nueva pantalla
  Settings: undefined;          // ← Nueva pantalla
  Transactions: { userId: string }; // ← Con parámetros
};
```

### Para tipos de usuario:
```typescript
// Futuro: user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
```

### Para tipos de API:
```typescript
// Futuro: api.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
```

## ✅ Beneficios de esta organización

- **🎯 Centralizado**: Todos los tipos en un lugar
- **📦 Limpio**: Imports desde `../types` en lugar de rutas largas
- **🔧 Escalable**: Fácil agregar nuevos tipos
- **📝 Documentado**: Cada tipo está claramente definido
- **🔒 Type Safety**: TypeScript nos protege de errores

¡Ahora tienes una estructura de tipos completamente organizada y escalable! 🚀