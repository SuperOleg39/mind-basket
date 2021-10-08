import React from 'react';
import { useStore } from 'effector-react';
import { Link } from 'react-router-dom';
import { Document } from '../../document/model/document';
import { $documentsTree } from '../model/table-of-contents';

export const TableOfContents: React.FC<{
    wrapper?: keyof JSX.IntrinsicElements | React.ComponentType;
}> = ({ wrapper }) => {
    const documents = useStore($documentsTree);
    const Wrapper = wrapper || React.Fragment;

    return (
        <>
            {documents.map((document) => {
                return (
                    <Wrapper key={document.id}>
                        <DocumentLink document={document} />
                    </Wrapper>
                );
            })}
        </>
    );
};

export const DocumentLink = ({ document }: { document: Document }) => {
    // @todo nested documents tree
    return <Link to={`/documents/${document.id}`}>{document.title}</Link>;
};
