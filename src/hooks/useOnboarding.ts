// Enhanced onboarding hook: re-exports context and provides screen-specific state helpers
import { useOnboarding as useOnboardingContext } from '../context/OnboardingContext';
import { useState, useEffect, useCallback } from 'react';

export const useOnboarding = () => {
	const ctx = useOnboardingContext();
	const { state, updateAnswer } = ctx;

	// Localized state for Welcome screen (moved from screen file)
	const [name, setName] = useState<string>(state.name || '');
	const [selectedGoals, setSelectedGoals] = useState<string[]>((state.objetivos as string[]) || []);
	const [selectedTone, setSelectedTone] = useState<string | null>(state.tone || null);

	// Localized state for Questions (screen 2)
	const [city, setCity] = useState<string>(state.city || '');
	const [neighborhood, setNeighborhood] = useState<string>(state.neighborhood || '');
	const [livingWith, setLivingWith] = useState<string | null>((state.livingWith as string) || null);
	const [hasDependents, setHasDependents] = useState<boolean | null>(
		state.hasDependents === undefined ? null : (state.hasDependents as boolean | null)
	);
	const [occupation, setOccupation] = useState<string>(state.occupation || '');
	const [transport, setTransport] = useState<string | null>((state.transport as string) || null);

	// Sync initial values when context loads (e.g., restoring from storage)
	useEffect(() => {
		if ((state.name || '') !== name) setName(state.name || '');
		const ctxGoals = (state.objetivos as string[]) || [];
		// shallow compare arrays
		const sameGoals = ctxGoals.length === selectedGoals.length && ctxGoals.every((g, i) => g === selectedGoals[i]);
		if (!sameGoals) setSelectedGoals(ctxGoals);
		if ((state.tone || null) !== selectedTone) setSelectedTone(state.tone || null);

		// questions initial sync
		if ((state.city || '') !== city) setCity(state.city || '');
		if ((state.neighborhood || '') !== neighborhood) setNeighborhood(state.neighborhood || '');
		if ((state.livingWith as string || null) !== livingWith) setLivingWith((state.livingWith as string) || null);
		if ((state.hasDependents === undefined ? null : (state.hasDependents as boolean | null)) !== hasDependents)
			setHasDependents(state.hasDependents === undefined ? null : (state.hasDependents as boolean | null));
		if ((state.occupation || '') !== occupation) setOccupation(state.occupation || '');
		if ((state.transport as string || null) !== transport) setTransport((state.transport as string) || null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.name, state.objetivos, state.tone, state.city, state.neighborhood, state.livingWith, state.hasDependents, state.occupation, state.transport]);

	// Persist changes into onboarding context but only when different from context
	useEffect(() => {
		if (state.name !== name) updateAnswer('name', name);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [name]);

	useEffect(() => {
		const ctxGoals = (state.objetivos as string[]) || [];
		const same = ctxGoals.length === selectedGoals.length && ctxGoals.every((g, i) => g === selectedGoals[i]);
		if (!same) updateAnswer('objetivos', selectedGoals);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedGoals]);

	useEffect(() => {
		if (selectedTone !== null && state.tone !== selectedTone) updateAnswer('tone', selectedTone);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedTone]);

	// Persist questions when they change, but guard updates to avoid loops
	useEffect(() => {
		if (state.city !== city) updateAnswer('city', city);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [city]);

	useEffect(() => {
		if (state.neighborhood !== neighborhood) updateAnswer('neighborhood', neighborhood);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [neighborhood]);

	useEffect(() => {
		if ((state.livingWith as string) !== livingWith) updateAnswer('livingWith', livingWith);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [livingWith]);

	useEffect(() => {
		const ctxVal = state.hasDependents === undefined ? null : (state.hasDependents as boolean | null);
		if (ctxVal !== hasDependents) updateAnswer('hasDependents', hasDependents);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasDependents]);

	useEffect(() => {
		if (state.occupation !== occupation) updateAnswer('occupation', occupation);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [occupation]);

	useEffect(() => {
		if ((state.transport as string) !== transport) updateAnswer('transport', transport);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transport]);

	const toggleGoal = useCallback((goal: string) => {
		setSelectedGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]));
	}, []);

	const clearWelcome = useCallback(() => {
		setName('');
		setSelectedGoals([]);
		setSelectedTone(null);
	}, []);

	// helpers for questions screen
	// require city, neighborhood and a livingWith selection
	const canContinueQuestions = city.trim().length > 0 && neighborhood.trim().length > 0 && !!livingWith;

	// can continue for welcome
	const canContinueWelcome = name.trim().length > 0 && !!selectedTone && selectedGoals.length > 0;

	return {
		...ctx,
		// welcome-specific state & helpers
		name,
		setName,
		selectedGoals,
		setSelectedGoals,
		toggleGoal,
		selectedTone,
		setSelectedTone,
		canContinueWelcome,
		clearWelcome,

		// questions-specific state
		city,
		setCity,
		neighborhood,
		setNeighborhood,
		livingWith,
		setLivingWith,
		hasDependents,
		setHasDependents,
		occupation,
		setOccupation,
		transport,
		setTransport,
		canContinueQuestions,
	};
};

export default useOnboarding;
