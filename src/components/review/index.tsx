import {ReactNode} from "react";
import Rating, {RatingScore} from "../rating";

interface Props {
    children: Array<[RatingScore, ReactNode]>;
}

export default function Review({children}: Props) {
    return (
        <table className="table">
            <tbody>
            {children.map(([rating, review]) => (
                <tr>
                    <td><Rating rating={rating}/></td>
                    <td>{review}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}