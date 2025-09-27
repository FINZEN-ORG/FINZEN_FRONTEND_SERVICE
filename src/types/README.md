# Types Folder

This folder contains TypeScript type definitions and interfaces used throughout the application.

## Purpose
- Centralized type definitions
- Shared interfaces and types
- Environment variable declarations
- API response types

## Current Type Files
- **env.d.ts** - Environment variable declarations
- **images.d.ts** - Image import declarations
- **api.ts** - API request/response types
- **user.ts** - User-related type definitions
- **navigation.ts** - Navigation type definitions

## Structure
```
types/
├── env.d.ts
├── images.d.ts
├── api.ts
├── user.ts
├── navigation.ts
└── index.ts
```

## Current Implementation
Currently implemented type files:
- `env.d.ts` - Environment variable declarations for react-native-dotenv
- `images.d.ts` - Image import declarations for assets

## Example Type Definitions

### User Types
```typescript
// user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}
```

### API Types
```typescript
// api.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
```

### Environment Types
```typescript
// env.d.ts
declare module '@env' {
  export const API_BASE_URL: string;
  export const GOOGLE_WEB_CLIENT_ID: string;
}
```

## Usage
```typescript
import { User, ApiResponse } from '../types';
import { API_BASE_URL } from '@env';

const fetchUser = async (id: string): Promise<User> => {
  const response: ApiResponse<User> = await api.get(`${API_BASE_URL}/users/${id}`);
  return response.data;
};
```

## Best Practices
- Use descriptive interface names
- Keep types focused and single-purpose
- Export commonly used types from index.ts
- Use generic types for reusable patterns
- Document complex types with comments
- Extend types when adding new properties
- Use union types for limited value sets