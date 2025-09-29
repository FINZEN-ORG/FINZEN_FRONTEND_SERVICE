# Utils Folder

This folder contains utility functions, helpers, and common tools used throughout the application.

## Purpose
- Reusable utility functions
- Common helpers for formatting, validation, etc.
- Constants and configuration helpers

## Common Utilities
- **formatters.ts** - Date, currency, text formatting functions
- **validators.ts** - Form validation and input checking
- **constants.ts** - App-wide constants and configuration
- **helpers.ts** - General utility functions
- **storage.ts** - AsyncStorage wrapper functions
- **permissions.ts** - Device permissions utilities

## Structure
```
utils/
├── formatters.ts
├── validators.ts
├── constants.ts
├── helpers.ts
├── storage.ts
├── permissions.ts
└── index.ts
```

## Example Utilities

### Formatters
```typescript
// formatters.ts
export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};
```

### Validators
```typescript
// validators.ts
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### Constants
```typescript
// constants.ts
export const COLORS = {
  primary: '#37706b',
  secondary: '#e9efe9ff',
  error: '#dc3545',
};
```

### Helpers
```typescript
// helpers.ts
export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
```

## Usage
```typescript
import { formatCurrency, isValidEmail } from '../utils';
import { COLORS } from '../utils/constants';
```

## Best Practices
- Keep functions pure (no side effects)
- Use descriptive function names
- Include TypeScript type annotations
- Group related utilities in the same file
- Export commonly used utilities from index.ts
- Write unit tests for complex utility functions