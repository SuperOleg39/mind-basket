import { createEvent, createStore } from 'effector';

type HistoryAction = string;

const FROZEN = Symbol();

export const historyActionAdded =
	createEvent<{ id: UniqueId; action: HistoryAction }>();

export const historyActionRemoved = createEvent<{ id: UniqueId }>();

export const historyFreeze = createEvent();

export const historyUnfreeze = createEvent();

// @todo FROZEN hack is so ugly, find a better way
export const $localHistory = createStore<
	Record<UniqueId, HistoryAction[]> & { [FROZEN]: boolean }
>({ [FROZEN]: false })
	// @todo: max length
	.on(historyActionAdded, (state, { id, action }) => {
		if (state[FROZEN]) {
			return state;
		}
		const nextHistory = state[id] ? [...state[id], action] : [action];
		return {
			...state,
			[id]: nextHistory,
		};
	})
	.on(historyActionRemoved, (state, { id }) => {
		if (state[FROZEN]) {
			return state;
		}
		if (!state[id]) {
			return state;
		}
		const nextHistory = [...state[id]];
		nextHistory.pop();
		return {
			...state,
			[id]: nextHistory,
		};
	})
	.on(historyFreeze, (state) => {
		return {
			...state,
			[FROZEN]: true,
		};
	})
	.on(historyUnfreeze, (state) => {
		return {
			...state,
			[FROZEN]: false,
		};
	});
