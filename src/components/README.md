# Components Folder

This folder contains reusable UI components that can be used across multiple screens.

## Purpose
- Shared components that promote code reusability
- Common UI elements like buttons, inputs, cards, etc.
- Components that maintain consistent design system

## Structure
- **common/** - Basic UI components (Button, Input, Card, etc.)
- **forms/** - Form-related components (FormField, Validator, etc.)
- **navigation/** - Navigation-specific components
- **[component]/** - Individual component folders with:
  - `Component.tsx` - Main component file
  - `Component.style.tsx` - Component-specific styles
  - `index.ts` - Export file

## Example Structure
```
components/
├── common/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.style.tsx
│   │   └── index.ts
│   └── Input/
└── forms/
```

## Usage
```typescript
import { Button } from '../../../components/common/Button';
```

## Best Practices
- Keep components small and focused on a single responsibility
- Use TypeScript interfaces for props
- Implement consistent styling patterns
- Write reusable and configurable components
- Export components through index.ts files