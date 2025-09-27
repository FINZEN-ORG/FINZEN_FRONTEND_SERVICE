# Navigation Folder

This folder contains navigation configuration and navigation-related components.

## Purpose
- React Navigation setup and configuration
- Navigation stacks, tabs, and drawer configurations
- Navigation utilities and helpers

## Structure
- **AppNavigator.tsx** - Main navigation container
- **AuthStack.tsx** - Authentication flow navigation
- **MainStack.tsx** - Main app navigation after login
- **TabNavigator.tsx** - Bottom tab navigation
- **types.ts** - Navigation type definitions

## Common File Structure
```
navigation/
├── AppNavigator.tsx
├── stacks/
│   ├── AuthStack.tsx
│   ├── MainStack.tsx
│   └── TabNavigator.tsx
├── types.ts
└── index.ts
```

## Example Navigation Setup
```typescript
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

## Types Example
```typescript
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Profile: { userId: string };
};
```

## Best Practices
- Use TypeScript for navigation types
- Separate navigation by feature/flow
- Keep navigation logic centralized
- Use proper screen options for consistent UI
- Implement deep linking support when needed
- Handle navigation state persistence