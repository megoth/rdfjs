import {ReactNode} from "react";

interface Props {
    children: ReactNode;
}

export default function Walkthrough({children}: Props) {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Part of logic</th>
                <th>Explanation</th>
            </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    );
}