import {LIBRARIES} from "../../constants.ts";
import {NavLink} from "react-router-dom";
import styles from "./style.module.css";
import {clsx} from "clsx";
import Card from "../card";

export default function LibraryList() {
    return (
        <div className={clsx("menu", styles.libraryList)}>
            <ul className={clsx("columns", styles.columns)}>
                {LIBRARIES.map(({creator, href, icon, iconAlt, name}) => (
                    <div key={href} className={clsx("column", styles.column)}>
                        <Card className={clsx("card", styles.card)}>
                            <NavLink to={href} className={clsx("card-content", styles.cardContent)}>
                                <div className={clsx("media", styles.media)}>
                                    <div className={clsx("media-left", styles.mediaLeft)}>
                                        <figure className="image">
                                            <img src={icon} alt={iconAlt}/>
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <p className="title is-4">{name}</p>
                                        <p className="subtitle is-6">By {creator}</p>
                                    </div>
                                </div>
                            </NavLink>
                        </Card>
                    </div>
                ))}
            </ul>
        </div>
    );
}