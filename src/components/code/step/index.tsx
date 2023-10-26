import CodeLink from "../../code-link";
import {HTMLAttributes, useContext} from "react";
import Content from "../../content";
import {CodeContext} from "../index.tsx";

interface Props extends HTMLAttributes<HTMLTableDataCellElement> {
    lines: string[];
    title: string;
}

export default function CodeStep({children, lines, title, ...props}: Props) {
    const {id} = useContext(CodeContext);
    return (
        <tr>
            <td>
                <CodeLink id={id} lines={lines}>{title}</CodeLink>
            </td>
            <td {...props}>
                <Content>{children}</Content>
            </td>
        </tr>
    )
}