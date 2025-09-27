# Services Folder

This folder contains service classes and API-related logic.

## Purpose
- Abstract API calls and external service integrations
- Centralize business logic and data operations
- Provide clean interfaces for components to interact with backend

## Current Services
- **AuthService.ts** - Authentication and user management
- **ApiService.ts** - Generic API client and HTTP operations
- **StorageService.ts** - Local storage and data persistence
- **NotificationService.ts** - Push notifications and alerts

## Service Structure
```
services/
├── AuthService.ts
├── ApiService.ts
├── StorageService.ts
├── NotificationService.ts
└── index.ts
```

## Current Implementation
The **AuthService** is fully implemented with:
- Google Sign-in integration
- JWT token management
- User session handling
- Environment variables integration

## Example Service Pattern
```typescript
class AuthService {
  static async login(credentials: LoginCredentials): Promise<User> {
    // API call logic
  }
  
  static async getCurrentUser(): Promise<User> {
    // Get current user logic
  }
  
  static async logout(): Promise<void> {
    // Logout logic
  }
}
```

## Usage in Components
```typescript
import AuthService from '../services/AuthService';

const LoginScreen = () => {
  const handleLogin = async () => {
    try {
      const user = await AuthService.loginWithGoogle();
      // Handle success
    } catch (error) {
      // Handle error
    }
  };
};
```

## Best Practices
- Use static methods for stateless operations
- Implement proper error handling
- Use TypeScript interfaces for request/response types
- Keep services focused on single responsibilities
- Use environment variables for API endpoints
- Implement retry logic for network requests
- Use axios for HTTP client with proper configuration