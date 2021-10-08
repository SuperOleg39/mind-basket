import {
    createDocumentFx,
    Document,
    loadAllDocumentsFx,
} from '../../../entities/document/model/document';
import { ApiService } from '../../../shared/api';
import {
    applicationLoaded,
    workspaceInitialized,
    createDocumentButtonPressed,
} from './workspace';
import { history } from '../../../shared/history';

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// @TODO: replace mock
const apiService = {
    request: async (url) => {
        if (url === `/documents`) {
            await sleep(500);

            const response: Document[] = [
                {
                    id: 'document-x9c8v7-1',
                    title: 'Document One',
                    blocks: [],
                    documents: ['document-x9c8v7-1-1'],
                    order: 0,
                },
                {
                    id: 'document-x9c8v7-2',
                    title: 'Document Two',
                    blocks: [],
                    documents: [],
                    order: 1,
                },
                {
                    id: 'document-x9c8v7-3',
                    title: 'Document Three',
                    blocks: [],
                    documents: [],
                    order: 2,
                },
            ];

            return response;
        } else if (url.startsWith(`/documents/`)) {
            await sleep(200);
        }
    },
} as ApiService;

applicationLoaded.watch(() => {
    loadAllDocumentsFx({ apiService });
});

loadAllDocumentsFx.done.watch(() => {
    workspaceInitialized();
});

createDocumentButtonPressed.watch(() => {
    createDocumentFx({ apiService, history });
});
