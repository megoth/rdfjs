import {LIBRARIES, RATING_CRITERIA} from "../../constants.ts";
import Rating from "../rating";
import {NavLink} from "react-router-dom";
import {clsx} from "clsx";
import styles from "./style.module.css";

export default function ReviewList() {
    const libraries = LIBRARIES.filter(({published}) => published);
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
                {libraries.map(({href, review, text}) => (
                    <tr key={href}>
                        <td>{text}</td>
                        {RATING_CRITERIA.map(([id], index) => (
                            <td key={`${href}-${id}`}>
                                <NavLink to={`${href}#${id}`}>
                                    <Rating rating={review[index]}/>
                                </NavLink>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}