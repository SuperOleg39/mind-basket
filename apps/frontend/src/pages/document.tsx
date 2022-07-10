import React from 'react';
import { useStore } from 'effector-react';
import { useParams } from 'react-router';
import { Workspace } from '../features/workspace';
import { Editor } from '../features/editor/ui/editor';
import { $documentsList } from '../entities/document/model/document';
import { Layout } from '../shared/ui/layout/layout';
import { $blocks } from '../entities/block/model/block';

export const DocumentPage = () => {
    const { id: currentDocumentId } = useParams<{ id: UniqueId }>();
    const documents = useStore($documentsList);
	const blocks = useStore($blocks);
    const currentDocument = documents[currentDocumentId];

    return (
        <Layout
            sidebar={<Workspace />}
            main={currentDocument && <Editor document={currentDocument} blocks={blocks} />}
        />
    );
};
