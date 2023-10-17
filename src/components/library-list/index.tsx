import {LIBRARIES} from "../../constants.ts";
import {NavLink} from "react-router-dom";
import styles from "./style.module.css";
import {clsx} from "clsx";

export default function LibraryList() {
    return (
        <div className={clsx("menu", styles.libraries)}>
            <ul className={clsx("columns", styles.columns)}>
                {LIBRARIES.map(({creator, href, icon, iconAlt, name}) => (
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
                            </div>
                        </NavLink>
                    </div>
                ))}
            </ul>
        </div>
    );
}