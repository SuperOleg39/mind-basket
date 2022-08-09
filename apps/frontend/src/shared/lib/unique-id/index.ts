let current = 0;

export const createUniqueId = (prefix?: string): UniqueId => {
    return `${prefix || ''}unique-${current++}`;
};
