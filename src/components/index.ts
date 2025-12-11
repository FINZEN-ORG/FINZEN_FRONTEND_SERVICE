// Archivo principal de exportación de componentes
// Facilita las importaciones desde cualquier parte de la app

// AIMessage
export { AIMessage, type AIMessageProps, type MessageType } from './AIMessage';

// CategoryCard
export { CategoryCard, type CategoryCardProps } from './CategoryCard';

// ExpenseCard
export { ExpenseCard, type ExpenseCardProps } from './ExpenseCard';

// ScreenTitle
export { default as ScreenTitle } from './ScreenTitle';

// SectionSubtitle
export { SectionSubtitle, type SectionSubtitleProps } from './SectionSubtitle';

// TabNavigator
export { default as TabNavigator } from './TabNavigator';

// Budget Components
export { default as CategoriesSection } from './CategoriesSection';
export { default as ExpensesList } from './ExpensesList';
export { default as FloatingActionButton } from './FloatingActionButton';
export { default as FloatingMenu } from './FloatingMenu';

// DatePicker
export { DatePicker, type DatePickerProps } from './DatePicker';

// AISuggestionCard
export { default as AISuggestionCard } from './AISuggestionCard/AISuggestionCard';

// FormField (generic form input renderer)
export { default as FormField } from './FormField/FormField';
export { default as FormRenderer } from './FormRenderer/FormRenderer';
export { default as ButtonRenderer } from './ButtonRenderer/ButtonRenderer';
export { default as ButtonItem } from './ButtonItem';

// HeaderWithBack
export { HeaderWithBack, type HeaderWithBackProps } from './HeaderWithBack';

// OptionCard (Onboarding)
export { default as OptionCard } from './OptionCard/OptionCard';

// MotivationalMessage
export { default as MotivationalMessage } from './MotivationalMessage/MotivationalMessage';