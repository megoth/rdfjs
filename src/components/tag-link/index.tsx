import {HTMLAttributes} from "react";
import {TagModel} from "../../constants.tsx";
import {NavLink, useSearchParams} from "react-router-dom";

interface Props extends HTMLAttributes<HTMLAnchorElement> {
    tag: TagModel
    remove?: boolean
}

export default function TagLink({children, tag, remove, ...props}: Props) {
    const [searchParams] = useSearchParams();
    const tags = remove
        ? searchParams.getAll("tag").filter((name) => name !== tag.name)
        : Array.from(new Set([...searchParams.getAll("tag"), tag.name]));
    const search = tags.length === 0
        ? ""
        : `?${tags.map((name) => `tag=${name}`).join("&")}`;
    return <NavLink to={location.origin + location.pathname + search} {...props} preventScrollReset={true}>
        {children}
        {remove && <button className="delete is-small"/>}
    </NavLink>
}