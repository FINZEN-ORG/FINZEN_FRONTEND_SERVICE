# Hooks Folder

This folder contains custom React hooks for reusable logic.

## Purpose
- Extract and share common component logic
- Custom hooks for API calls, form handling, etc.
- Simplify component code by abstracting complex logic

## Common Hook Types
- **useAuth()** - Authentication-related operations
- **useApi()** - API call management with loading states
- **useForm()** - Form validation and submission logic
- **useLocalStorage()** - Local storage operations
- **useDebounce()** - Debounced values for search/input
- **usePermissions()** - Device permissions handling

## Structure
```
hooks/
├── useAuth.ts
├── useApi.ts
├── useForm.ts
├── useLocalStorage.ts
└── index.ts
```

## Example Hook Implementation
```typescript
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const login = async (credentials) => {
    setLoading(true);
    // Login logic
    setLoading(false);
  };
  
  return { user, login, loading };
};
```

## Usage Example
```typescript
import { useAuth } from '../hooks/useAuth';

const LoginScreen = () => {
  const { user, login, loading } = useAuth();
  // Component logic
};
```

## Best Practices
- Start hook names with "use"
- Return objects for multiple values
- Use TypeScript for type safety
- Keep hooks focused on single responsibility
- Handle loading and error states
- Make hooks reusable across components