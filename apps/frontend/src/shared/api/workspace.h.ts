export type Workspace = {
    id: UniqueId;
    documents: DocumentTree[];
};

export type DocumentTree = {
    id: UniqueId;
    title: string;
    documents: DocumentTree;
};
