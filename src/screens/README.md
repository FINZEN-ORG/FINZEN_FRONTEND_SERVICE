# Screens Folder

This folder contains all application screens/pages organized by feature or flow.

## Purpose
- Full-screen components that represent app pages
- Organized by feature domains or user flows
- Each screen handles specific user interactions

## Current Structure
- **auth/** - Authentication screens (Login, SignUp, ForgotPassword)
- **home/** - Home and main app screens (SplashScreen, Dashboard)
- **dashboard/** - Dashboard and main content screens
- **profile/** - User profile related screens
- **settings/** - App settings and configuration screens

## Example Organization
```
screens/
├── auth/
│   ├── LoginScreen.tsx
│   ├── LoginScreen.Style.tsx
│   ├── SignUpScreen.tsx
│   └── ForgotPasswordScreen.tsx
├── home/
│   ├── SplashScreen.tsx
│   ├── SplashScreen.Style.tsx
│   └── HomeScreen.tsx
├── dashboard/
│   ├── Dashboard.tsx
│   └── Dashboard.Style.tsx
└── profile/
    ├── ProfileScreen.tsx
    └── EditProfileScreen.tsx
```

## Current Implemented Screens
- **SplashScreen**: Animated intro screen with FinZen logo
- **LoginScreen**: Google Sign-in authentication
- **Dashboard**: Post-authentication main screen

## Naming Convention
- Screen components end with "Screen" (LoginScreen, HomeScreen)
- Style files follow `[ScreenName].Style.tsx` pattern
- Group related screens in feature folders

## Best Practices
- Keep screens focused on presentation logic
- Move business logic to services or custom hooks
- Use separate style files for better organization
- Include proper TypeScript interfaces for props
- Handle loading and error states appropriately
- Use the AuthService for authentication-related operations