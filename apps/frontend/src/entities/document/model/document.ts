import { createStore, createEffect, createEvent } from 'effector';
import { History } from 'history';
import { ApiService } from '../../../shared/api';
import { createUniqueId } from '../../../shared/unique-id';

export type Document = {
    id: UniqueId;
    title: string;
    blocks: UniqueId[];
    documents: UniqueId[];
    order: number;
};

export const createDocument = (
    from: Pick<Document, 'id'> & Partial<Omit<Document, 'id'>>
): Document => {
    return {
        title: '',
        blocks: [],
        documents: [],
        order: 0,
        ...from,
    };
};

export const loadAllDocumentsFx = createEffect(
    async ({ apiService }: { apiService: ApiService }) => {
        return apiService.request<Document[]>(`/documents`);
    }
);

export const loadDocumentFx = createEffect(
    async ({ id, apiService }: { id: UniqueId; apiService: ApiService }) => {
        return apiService.request<Document>(`/documents/${id}`);
    }
);

export const createDocumentFx = createEffect(
    async ({
        apiService,
        history,
    }: {
        apiService: ApiService;
        history: History;
    }) => {
        const id = createUniqueId('document-');

        newDocumentCreated(id);
        navigateToDocumentFx({ id, history });

        return apiService.request(`/documents/${id}`, { method: 'POST' });
    }
);

export const navigateToDocumentFx = createEffect(
    ({ id, history }: { id: UniqueId; history: History }) => {
        return history.push(`/documents/${id}`);
    }
);

export const newDocumentCreated = createEvent<UniqueId>();

export const $documentsList = createStore<Record<UniqueId, Document>>({})
    .on(loadAllDocumentsFx.doneData, (documentsList, documentsArray) => {
        const nextDocumentsList = documentsArray.reduce((list, document) => {
            list[document.id] = document;
            return list;
        }, documentsList);

        return { ...nextDocumentsList };
    })
    .on(loadDocumentFx.doneData, (documentsList, document) => ({
        ...documentsList,
        [document.id]: document,
    }))
    .on(newDocumentCreated, (documentsList, documentId) => ({
        ...documentsList,
        [documentId]: createDocument({
            id: documentId,
            title: 'Untitled',
            order: -1,
        }),
    }));
