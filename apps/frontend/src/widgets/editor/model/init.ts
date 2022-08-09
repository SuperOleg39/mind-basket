import { sample } from 'effector';

import { newDocumentCreated } from '../../../entities/document/model/document';
import { blockFocusedEvent } from './editor';

// focus on title of created document
sample({
	clock: newDocumentCreated,
	target: blockFocusedEvent,
});
