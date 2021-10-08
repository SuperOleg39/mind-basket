import { createStore } from 'effector';

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

export const $blocks = createStore<{ [key: UniqueId]: Block }>({});
