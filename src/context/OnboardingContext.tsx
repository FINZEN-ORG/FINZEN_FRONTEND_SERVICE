import React, { createContext, useContext, useReducer, ReactNode, useEffect, useRef, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type OnboardingState = {
  step: number;
  name?: string;
  goal?: string;
  tone?: 'formal' | 'relaxed' | null;
  city?: string;
  neighborhood?: string;
  livingWith?: 'solo' | 'pareja' | 'familia' | 'roomies' | null;
  hasDependents?: boolean | null;
  occupation?: string;
  transport?: string | null;
  incomeFrequency?: 'weekly' | 'biweekly' | 'monthly' | null;
  controlsExpenses?: 'always' | 'sometimes' | 'never' | null;
  saves?: boolean | null;
  biggestExpense?: string | null;
  likes?: string[];
  weekend?: string | null;
  relaxActivities?: string[];
  financialGoalType?: string | null;
  financialGoalText?: string | null;
  financialGoalTerm?: string | null;
  [key: string]: any;
};

type Action =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_ANSWER'; payload: { key: string; value: any } }
  | { type: 'LOAD'; payload: Partial<OnboardingState> }
  | { type: 'RESET' };

const STORAGE_KEY = '@finzen_onboarding_v1';

const initialState: OnboardingState = { step: 0 };

function reducer(state: OnboardingState, action: Action): OnboardingState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'UPDATE_ANSWER':
      return { ...state, [action.payload.key]: action.payload.value };
    case 'LOAD':
      return { ...state, ...action.payload };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

type ContextValue = {
  state: OnboardingState;
  setStep: (s: number) => void;
  updateAnswer: (key: string, value: any) => void;
  submit: () => Promise<void>;
  reset: () => void;
};

const OnboardingContext = createContext<ContextValue | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const saveTimer = useRef<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          dispatch({ type: 'LOAD', payload: parsed });
        }
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  useEffect(() => {
    // debounce persist
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = (setTimeout(async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        // ignore
      }
    }, 700) as unknown) as number;
  }, [state]);

  const setStep = useCallback((s: number) => dispatch({ type: 'SET_STEP', payload: s }), [dispatch]);
  const updateAnswer = useCallback((key: string, value: any) => dispatch({ type: 'UPDATE_ANSWER', payload: { key, value } }), [dispatch]);

  const reset = useCallback(async () => {
    dispatch({ type: 'RESET' });
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  }, [dispatch]);

  const submit = useCallback(async () => {
    // Not sending to backend yet - show Alert with payload
    const payload: { [k: string]: any } = {};
    Object.keys(state).forEach((k) => {
      if (k === 'step') return;
      payload[k] = (state as any)[k];
    });
    Alert.alert('Onboarding payload', JSON.stringify(payload, null, 2));
    await reset();
  }, [state, reset]);

  return (
    <OnboardingContext.Provider value={{ state, setStep, updateAnswer, submit, reset }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
};

export default OnboardingContext;
