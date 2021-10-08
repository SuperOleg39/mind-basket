export type Block = {
    id: UniqueId;
    type: BlockType;
    content: string;
};

export type BlockType = 'text';
