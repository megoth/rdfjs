import {LIBRARIES, RATING_CRITERIA} from "../../constants.ts";
import Rating from "../rating";
import {NavLink} from "react-router-dom";
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
                        <td>
                            <NavLink to={`${href}#review`}>{text}</NavLink>
                        </td>
                        {review ? RATING_CRITERIA.map(([id], index) => (
                            <td key={`${href}-${id}`}>
                                <NavLink to={`${href}#${id}`}>
                                    <Rating rating={review[index]}/>
                                </NavLink>
                            </td>
                        )) : <td colSpan={5}>No review available</td> }
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}