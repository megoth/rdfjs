import {LIBRARIES, RATING_CRITERIA} from "../../constants.ts";
import Rating from "../rating";
import {StyledLink} from "rakkasjs";
import {clsx} from "clsx";
import styles from "./style.module.css";

export default function ReviewList() {
    return (
        <div className="table-container">
            <table className={clsx("table is-striped is-fullwidth", styles.table)}>
                <thead>
                <tr>
                    <th></th>
                    {RATING_CRITERIA.map(([id, text]) => (
                        <th key={id}>{text}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {LIBRARIES.map(({href, review, text}) => (
                    <tr key={href}>
                        <td>{text}</td>
                        {RATING_CRITERIA.map(([id], index) => (
                            <td key={`${href}-${id}`}>
                                <StyledLink href={`${href}#${id}`}>
                                    <Rating rating={review[index]}/>
                                </StyledLink>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}