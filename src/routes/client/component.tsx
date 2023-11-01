import {useLayoutEffect} from "react";
import {getRedirectQueries, parseSearch, serializeSearch} from "../../libs/location.ts";
import {useNavigate} from "react-router-dom";

export default function ClientComponent() {
    // This code feels very weird, so there's probably a better solution. But it will have to work for now.
    const navigate = useNavigate();
    const {origin, pathname, search} = location;
    const redirectIdQuery = parseSearch(search)?.redirectId;
    useLayoutEffect(() => {
        const {redirectId, ...queries} = getRedirectQueries(new URL(origin + pathname + search), redirectIdQuery?.[0]);
        if (!redirectId) return;
        const redirectUrl = `${location.pathname + serializeSearch(queries)}#${redirectId[0]}`
        setTimeout(() => {
            navigate(redirectUrl, {replace: true, preventScrollReset: false});
            document.getElementById(redirectId[0])?.scrollIntoView({behavior: "smooth"})
        }, 100);
    }, [navigate, origin, pathname, redirectIdQuery, search]);
    return <></>;
}