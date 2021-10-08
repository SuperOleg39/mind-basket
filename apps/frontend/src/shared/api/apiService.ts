export type ApiService = {
    request<R extends any>(url: string, options?: RequestInit): Promise<R>;
};
