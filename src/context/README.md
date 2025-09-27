# Context Folder

This folder contains React Context providers for global state management.

## Purpose
- Application-wide state management
- Share data between components without prop drilling
- Theme, authentication, user preferences, etc.

## Structure
- **AuthContext.tsx** - Authentication state and methods
- **ThemeContext.tsx** - App theme and styling configuration
- **UserContext.tsx** - User data and preferences
- **AppContext.tsx** - General application state

## Example Context Structure
```
context/
├── AuthContext.tsx
├── ThemeContext.tsx
├── UserContext.tsx
└── index.ts
```

## Usage
```typescript
// Provider (in App.tsx)
<AuthProvider>
  <App />
</AuthProvider>

// Consumer (in any component)
const { user, login, logout } = useAuth();
```

## Best Practices
- Keep contexts focused on specific domains
- Use TypeScript interfaces for context values
- Provide default values for all context properties
- Combine with reducers for complex state logic
- Avoid putting too much data in a single context
- Use multiple contexts for different concerns

## Implementation Pattern
```typescript
interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
```