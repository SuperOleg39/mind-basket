import React from 'react';
import { Block } from '../../../entities/block/model/block';

export const Line = (block: Block) => {
    switch (block.type) {
        case 'title': {
            return <h1 contentEditable>{block.content}</h1>;
        }
        case 'text': {
            return <div contentEditable>{block.content}</div>;
        }
        default: {
            return null;
        }
    }
};
