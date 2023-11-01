import {StyledLink} from "rakkasjs";
import {ReactNode} from "react";
import {toCodePart} from "../../libs/urls.ts";

interface Props {
    children?: ReactNode
    id: string
    lines: string[];
}

export default function CodeLink({children, id, lines}: Props) {
    return <StyledLink href={toCodePart(id, lines[0], ...lines.slice(1))}>{children}</StyledLink>
}