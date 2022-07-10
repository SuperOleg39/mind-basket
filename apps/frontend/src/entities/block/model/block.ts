import { createStore, createEvent } from 'effector';

export type Block = {
	id: UniqueId;
	type: BlockType;
	content: string;
};

export type BlockType = 'title' | 'text';

export const createBlock = ({
	id,
	type,
}: {
	id: UniqueId;
	type: BlockType;
}): Block => {
	return {
		id,
		type,
		content: '',
	};
};

export const blockAdded = createEvent<Block>();
export const blockContentChanged = createEvent<Block>();

export const $blocks = createStore<{ [key: UniqueId]: Block }>({})
	.on(blockAdded, (state, block) => {
		return {
			...state,
			[block.id]: { ...block },
		};
	})
	.on(blockContentChanged, (state, block) => {
		return {
			...state,
			[block.id]: { ...state[block.id], content: block.content },
		};
	});
