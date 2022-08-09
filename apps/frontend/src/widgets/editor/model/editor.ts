import { createEffect, createEvent, sample } from 'effector';
import {
	Block,
	blockAdded,
	blockContentChanged,
	createBlock,
} from '../../../entities/block/model/block';
import {
	Document,
	documentBlockAdded,
	documentTitleChanged,
} from '../../../entities/document/model/document';
import { createUniqueId } from '../../../shared/lib/unique-id';

export const newLineEvent = createEvent<{
	document: Document | null;
	block: Block;
}>();

export const titleChangedEvent = createEvent<{
	document: Document | null;
	block: Block;
}>();

export const lineChangedEvent = createEvent<{
	document: Document | null;
	block: Block;
}>();

export const newLineFx = createEffect(
	async ({
		document,
		block,
	}: {
		document: Document | null;
		block: Block;
	}) => {
		if (!document) {
			return;
		}

		let position: number;

		if (block.type === 'title') {
			position = 0;
		} else {
			position = document.blocks.indexOf(block.id) + 1;
		}

		const nextBlock = createBlock({
			id: createUniqueId('block-'),
			type: 'text',
		});

		blockAdded(nextBlock);
		documentBlockAdded({ position, id: document.id, block: nextBlock });
	}
);

// @todo move to init.ts

sample({
	clock: newLineEvent,
	fn: ({ document, block }) => ({ document, block }),
	target: newLineFx,
});

sample({
	clock: titleChangedEvent,
	fn: ({ block }) => ({ id: block.id, title: block.content }),
	target: documentTitleChanged,
});

sample({
	clock: lineChangedEvent,
	fn: ({ block }) => block,
	target: blockContentChanged,
});
