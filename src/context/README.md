# AuthContext - Sistema de Autenticación Centralizado

Este proyecto utiliza un **AuthContext** centralizado para manejar toda la lógica de autenticación, eliminando completamente la necesidad de pasar props entre componentes.

## ✅ ¿Qué se logró?

### Antes (con props):
```tsx
// ❌ Pasar props manualmente
<LoginScreen onLogin={(user) => setUser(user)} />
<Dashboard user={user} onLogout={() => setUser(null)} />
```

### Ahora (con AuthContext):
```tsx
// ✅ Componentes completamente independientes
<LoginScreen />
<Dashboard />
```

### Beneficios obtenidos:
- **🚫 Zero prop drilling**: No más props de autenticación
- **🔄 Navegación automática**: El cambio de estado redirige automáticamente
- **📍 Estado centralizado**: Una sola fuente de verdad para autenticación
- **🔧 Fácil mantenimiento**: Componentes desacoplados
- **⚡ Mejor rendimiento**: Menos re-renders innecesarios

## 🛠️ Cómo usar

### Hook básico `useAuth`
```tsx
import { useAuth } from '../context/AuthContext';

function MiComponente() {
  const { user, isLoading, isAuthenticated } = useAuth();
  
  if (isLoading) return <Text>Cargando...</Text>;
  if (!isAuthenticated) return <Text>No autenticado</Text>;
  
  return <Text>Hola, {user?.name}!</Text>;
}
```

### Hook de acciones `useAuthActions`
```tsx
import { useAuthActions } from '../hooks/useAuthActions';

function LoginButton() {
  const { handleGoogleLogin } = useAuthActions();
  
  return (
    <TouchableOpacity onPress={handleGoogleLogin}>
      <Text>Iniciar Sesión</Text>
    </TouchableOpacity>
  );
}
```

## 🏗️ Arquitectura

```
App.tsx
└── AuthProvider                    # Provee contexto global
    └── AuthStack                   # Maneja navegación automática
        ├── SplashScreen           # Verifica estado inicial
        ├── LoginScreen            # Login independiente
        └── Dashboard              # Dashboard independiente
```

## 📋 API del AuthContext

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `user` | `User \| null` | Datos del usuario actual |
| `isLoading` | `boolean` | Indica si está cargando |
| `isAuthenticated` | `boolean` | Estado de autenticación |
| `login(userData)` | `function` | Establece usuario autenticado |
| `logout()` | `function` | Cierra sesión |
| `checkAuthStatus()` | `function` | Verifica estado actual |

## 🔄 Flujo de navegación automática

1. **App inicia** → `AuthProvider` inicializa contexto
2. **SplashScreen** → llama `checkAuthStatus()`
3. **AuthContext cambia** → `AuthStack` escucha cambios
4. **Navegación automática**:
   - `isAuthenticated: true` → Dashboard
   - `isAuthenticated: false` → Login

## 💡 Ejemplos de uso

### Componente protegido
```tsx
function ComponenteProtegido() {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Text>Acceso denegado</Text>;
  }
  
  return <Text>Contenido para {user?.name}</Text>;
}
```

### Botón de logout
```tsx
function LogoutButton() {
  const { handleLogout } = useAuthActions();
  
  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text>Cerrar Sesión</Text>
    </TouchableOpacity>
  );
}
```

### Estado de carga global
```tsx
function LoadingOverlay() {
  const { isLoading } = useAuth();
  
  if (!isLoading) return null;
  
  return (
    <View style={styles.overlay}>
      <ActivityIndicator />
    </View>
  );
}
```

## 🎯 Resultado final

Ahora puedes:
- ✅ Agregar nuevos componentes sin preocuparte por props de auth
- ✅ Acceder a datos de usuario desde cualquier lugar
- ✅ La navegación se maneja automáticamente
- ✅ Manejar logout desde cualquier pantalla
- ✅ Verificar estado de autenticación fácilmente

¡Tu app ahora tiene un sistema de autenticación robusto y escalable! 🚀