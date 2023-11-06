import {Location} from "@remix-run/router";
import {LoginOptions} from "@ldo/solid-react/src/SolidAuthContext.ts";


export function parseSearch(search?: string): Record<string, string> {
    // fetched from https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object
    if (!search) return {};
    return JSON.parse('{"' + search.substring(1).replace(/&/g, '","').replace(/=/g, '":"') + '"}', (key, value) => key === "" ? value : decodeURIComponent(value))
}

export function serializeSearch(queries: Record<string, string>): string {
    return Object.keys(queries).length > 0
        ? `?${Object.entries(queries).map(([key, value]) => `${key}=${value}`).join("&")}`
        : "";
}

export function hijackLogin(
    login: (issuer: string, loginOptions?: LoginOptions) => Promise<void>,
    routerLocation: Location,
    location: typeof window.location,
    href: string,
    redirectId?: string
) {
    return async (issuer: string) => {
        const hash = routerLocation.hash;
        const queries = {
            ...parseSearch(location.search),
            ...(hash ? {redirectId: hash.substring(1)} : {}),
            ...(redirectId ? {redirectId} : {})
        };
        const redirectUrl = location.origin + href + serializeSearch(queries);
        await login(issuer, {clientName: "RDF + JS: Learning how to manage RDF graphs with JavaScript", redirectUrl})
    };
}