import {NavLink} from "react-router-dom";
import {toCodePart} from "../code";
import {ReactNode} from "react";

interface Props {
    children?: ReactNode
    id: string
    lines: string[];
}

export default function CodeLink({children, id, lines}: Props) {
    return <NavLink to={toCodePart(id, lines[0], ...lines.slice(1))} preventScrollReset={true}>{children}</NavLink>
}