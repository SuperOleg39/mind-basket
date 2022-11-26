import { createEffect, createEvent, sample } from 'effector';
import {
	$localHistory,
	historyActionAdded,
	historyActionRemoved,
	historyFreeze,
	historyUnfreeze,
} from '../../../features/local-history/model';
import {
	Document,
	documentBlockAdded,
	documentBlockDeleted,
} from '../../../entities/document/model/document';
import {
	deleteLineEvent,
	lineChangedEvent,
	newLineEvent,
	titleChangedEvent,
} from './editor';

export const undoEvent = createEvent<{ document: Document }>();

export const undoActionFx = createEffect(
	async ({ document }: { document: Document | null }) => {
		console.error('wtf document', document);
		if (!document) {
			return;
		}

		const { id } = document;
		// @todo: use sample for passing data from store to effect
		const history = $localHistory.getState()[id] ?? [];
		const lastAction = history[history.length - 1];

		console.error('[log] lastAction', lastAction);
		if (!lastAction) {
			return;
		}

		const { action, payload } = JSON.parse(lastAction);

		historyActionRemoved({ id });

		historyFreeze();

		// @todo prevent saving produced events to history without local-history FROZEN hack
		switch (action) {
			case 'add-line': {
				deleteLineEvent({ document, block: payload });
				return;
			}
			case 'delete-line': {
				newLineEvent({ document, block: payload });
				return;
			}
			// @todo 'title-change'
			// @todo 'line-change'
		}
	}
);

// @todo debounce history or better debounce some global "sync" event
sample({
	clock: documentBlockAdded,
	fn: ({ id, block }) => ({
		id,
		action: JSON.stringify({ action: 'add-line', payload: block }),
	}),
	target: historyActionAdded,
});

// @todo debounce history or better debounce some global "sync" event
sample({
	clock: documentBlockDeleted,
	fn: ({ id, block }) => ({
		id,
		action: JSON.stringify({ action: 'delete-line', payload: block }),
	}),
	target: historyActionAdded,
});

// @todo debounce history or better debounce some global "sync" event
sample({
	// @todo: wrong event
	clock: titleChangedEvent,
	fn: ({ document, block }) => ({
		id: document!.id,
		action: JSON.stringify({ action: 'title-change', payload: block }),
	}),
	target: historyActionAdded,
});

// @todo debounce history or better debounce some global "sync" event
sample({
	// @todo: wrong event
	clock: lineChangedEvent,
	fn: ({ document, block }) => ({
		id: document!.id,
		action: JSON.stringify({ action: 'line-change', payload: block }),
	}),
	target: historyActionAdded,
});

sample({
	clock: undoEvent,
	fn: (params) => params,
	target: undoActionFx,
});
sample({
	clock: undoActionFx.finally,
	target: historyUnfreeze,
});
