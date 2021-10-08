import { Block } from './block.h';

export type Document = {
    id: UniqueId;
    title: string;
    blocks: Block[];
    documents: UniqueId[];
};
