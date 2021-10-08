import React, { useEffect } from 'react';
import { useEvent, useStore } from 'effector-react';
import { TableOfContents } from '../../../entities/table-of-contents/ui/table-of-contents';
import {
    $workspace,
    applicationLoaded,
    createDocumentButtonPressed,
} from '../model/workspace';

export const Workspace = () => {
    const { loaded } = useStore($workspace);
    const initWorkspace = useEvent(applicationLoaded);

    useEffect(() => {
        initWorkspace();
    }, []);

    if (!loaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ul>
                <TableOfContents wrapper="li" />
                <li>
                    <CreateDocumentButton />
                </li>
            </ul>
        </>
    );
};

export const CreateDocumentButton = () => {
    const pressCreateDocumentButton = useEvent(createDocumentButtonPressed);

    return (
        <button type="button" onClick={pressCreateDocumentButton}>
            New page +
        </button>
    );
};
