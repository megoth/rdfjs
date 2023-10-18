import {ReactNode} from "react";

interface Props {
    children: ReactNode;
}

export default function Walkthrough({children}: Props) {
    return (
        <>
            <div className="message is-hidden-widescreen is-warning">
                <div className="message-header">A note on smaller screens</div>
                <div className="message-body">
                    These walkthroughes are best consumed at larger screens. If you are on smaller screens, note that
                    you might have to scroll down a bit to see the actual highlighted code.
                </div>
            </div>
            <table className="table is-striped">
                <thead>
                <tr>
                    <th>Part of logic</th>
                    <th>Explanation</th>
                </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </>
    );
}