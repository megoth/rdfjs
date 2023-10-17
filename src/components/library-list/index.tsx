import {LIBRARIES} from "../../constants.ts";
import {NavLink} from "react-router-dom";
import styles from "./style.module.css";
import {clsx} from "clsx";
import Rating from "../rating";

export default function LibraryList() {
    return (
        <div className={clsx("menu", styles.libraries)}>
            <ul className={clsx("columns", styles.columns)}>
                {LIBRARIES.map(({creator, href, icon, iconAlt, name, recommendation, review}) => (
                    <div key={href} className={clsx("column", styles.column)}>
                        <NavLink to={href} className={clsx("card", styles.card)}>
                            <div className={clsx("card-content", styles.cardContent)}>
                                <div className={clsx("media", styles.media)}>
                                    <div className={clsx("media-left", styles.mediaLeft)}>
                                        <figure className={clsx("image", styles.image)}>
                                            <img src={icon} alt={iconAlt}/>
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <p className="title is-4">{name}</p>
                                        <p className="subtitle is-6">By {creator}</p>
                                    </div>
                                </div>
                                <table className={clsx("table", styles.table)}>
                                    <tbody>
                                    <tr>
                                        <td>Overall score</td>
                                        <td><Rating rating={review[4]}/></td>
                                    </tr>
                                    <tr>
                                        <td>Recommendation</td>
                                        <td><strong>{recommendation}</strong></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </ul>
        </div>
    );
}