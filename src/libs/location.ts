export function parseSearch(search?: string): Record<string, string[]> {
    if (!search) return {};
    const json: Record<string, string[]> = {};
    search?.substring(1).split("&").forEach((query) => {
        const [key, value] = query.split("=");
        json[key] = [...(json[key] || []), value];
    })
    return json;
}

export function serializeSearch(queries: Record<string, string[]>): string {
    return Object.keys(queries).length > 0
        ? `?${Object.entries(queries).map(([key, value]) => `${key}=${value}`).join("&")}`
        : "";
}

export function getRedirectQueries(url: URL, redirectId?: string): Record<string, string[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {code, state, ...queries} = {
        ...parseSearch(url.search),
        ...(url.hash ? {redirectId: [url.hash.substring(1)]} : {}),
        ...(redirectId ? {redirectId: [redirectId]} : {})
    };
    return queries;
}

export function getRedirectUrl(url: URL, redirectId?: string): string {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return url.origin + url.pathname + serializeSearch(getRedirectQueries(url, redirectId));
}