import {NavLink} from "react-router-dom";
import {ReactNode} from "react";

interface Props {
    children?: ReactNode
    id: string
    lines: string[];
}

function toCodePart(id: string, line: string, ...lines: string[]): string {
    const dataLines = [line, ...lines].map((value) => `data-line=${value}`).join("&");
    return `?${dataLines}#${id}`;
}

export default function CodeLink({children, id, lines}: Props) {
    return <NavLink to={toCodePart(id, lines[0], ...lines.slice(1))} preventScrollReset={true}>{children}</NavLink>
}