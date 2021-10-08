import { createEvent, createStore } from 'effector';

export const applicationLoaded = createEvent();

export const workspaceInitialized = createEvent();

export const createDocumentButtonPressed = createEvent();

export const $workspace = createStore({
    loaded: false,
}).on(workspaceInitialized, (state) => ({ ...state, loaded: true }));
