import React from 'react';
import { Document } from '../../../entities/document/model/document';
import { Line } from './line';

export const Editor = ({ document }: { document: Document }) => {
    return (
        <>
            <Line type="title" content={document.title} />

            {document.blocks.map((block) => (
                <Line type={block.type} content={block.content} />
            ))}
        </>
    );
};
