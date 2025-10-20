# FinZen Frontend Service

This is a **FinZen** mobile application built with [React Native](https://reactnative.dev) and TypeScript, featuring Google authentication, animated screens, and a clean service-oriented architecture.

## 📱 Features

- **Custom Authentication**: Google Sign-in integration with JWT token management
- **Animated UI**: Custom splash screen with letter-by-letter animations
- **Custom Fonts**: Forque font family integration for enhanced typography
- **Secure Configuration**: Environment variables for sensitive data protection
- **Service Layer Architecture**: Centralized API calls and authentication management
- **TypeScript**: Full type safety and enhanced developer experience

## 🏗️ Project Architecture

The project follows a clean architecture pattern with organized folder structure:

```
src/
├── assets/          # Images, fonts, and static resources
├── components/      # Reusable UI components
├── context/         # React Context providers and state management
├── hooks/           # Custom React hooks for shared logic
├── navigation/      # Navigation structure and routing
├── screens/         # Screen components organized by feature
│   ├── auth/        # Authentication screens (Login, Register)
│   └── home/        # Main app screens (Dashboard, Splash)
├── services/        # API services and external integrations
├── utils/           # Helper functions and utilities
└── types/           # TypeScript type definitions
```

### 📁 Folder Structure Details

Each folder in the `src/` directory contains a detailed README.md file explaining its purpose, structure, and usage patterns. Here's a quick overview:

- **assets/**: Static resources including the FinZen logo, Forque font files, and any images or icons
- **components/**: Reusable UI components with consistent styling and behavior
- **context/**: React Context providers for global state management (auth, theme, etc.)
- **hooks/**: Custom hooks for authentication, API calls, storage, and shared business logic
- **navigation/**: Navigation configuration with stack, tab, and auth flow navigation
- **screens/**: Feature-organized screen components with authentication and main app screens
- **services/**: Centralized service layer for API calls, authentication, and external integrations
- **utils/**: Helper functions, constants, validation, and formatting utilities
- **types/**: TypeScript interfaces and type definitions for the entire application

## 🚀 Getting Started

### Prerequisites

Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd FINZEN_FRONTEND_SERVICE
```

2. **Install dependencies**
```bash
# Using npm
npm install

# OR using Yarn
yarn install
```

3. **Environment Configuration**

Create a `.env` file in the root directory with the following variables:
```env
# APIs Configuration
USERS_API_BASE_URL=http://your-backend-url:port/api
TRANSACTIONS_API_BASE_URL=http://your-backend-url:port/api
GOALS_API_BASE_URL=http://your-backend-url:port/api
# Google OAuth Configuration
GOOGLE_WEB_CLIENT_ID=your-google-web-client-id.apps.googleusercontent.com
```

4. **iOS Setup (iOS only)**
```bash
# Install CocoaPods dependencies
bundle install
bundle exec pod install
```

### Running the App

1. **Start Metro Bundle**

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Run on Device/Emulator

**Android:**
```bash
npm run android
# OR
yarn android
```

**iOS:**
```bash
npm run ios
# OR
yarn ios
```

## 🔧 Configuration

### Environment Variables

The app uses `react-native-dotenv` for environment variable management. Key variables include:

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
