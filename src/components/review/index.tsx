import {ReactNode} from "react";
import Rating, {RatingScore} from "../rating";

interface Props {
    children: Array<[RatingScore, ReactNode]>;
}

export default function Review({children}: Props) {
    return (
        <table className="table is-fullwidth is-striped">
            <tbody>
            {children.map(([rating, review], index) => (
                <tr key={`rating-${index}`}>
                    <td style={{width: 0}}><Rating rating={rating}/></td>
                    <td className="is-full">{review}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}