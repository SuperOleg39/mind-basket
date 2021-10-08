import { $documentsList } from '../../document/model/document';

export const $documentsTree = $documentsList.map((documentsList) => {
    const documentsArray = Object.values(documentsList);

    return documentsArray.sort((a, b) => a.order - b.order);
});
