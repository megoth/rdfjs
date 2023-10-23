import {LIBRARIES} from "../../constants.ts";
import {NavLink} from "react-router-dom";
import styles from "./style.module.css";
import {clsx} from "clsx";
import Card from "../card";

export default function LibraryList() {
    const libraries = LIBRARIES.filter(({published}) => published);
    return (
        <div className={clsx("menu", styles.libraryList)}>
            <ul className={clsx("columns", styles.columns)}>
                {libraries.map(({creator, href, icon, iconAlt, name}) => (
                    <div key={href} className={clsx("column", styles.column)}>
                        <Card className={clsx("card", styles.card)}>
                            <div className="card-image">
                                <picture className={clsx("image", styles.image)}>
                                    <img src={icon} alt={iconAlt}/>
                                </picture>
                            </div>
                            <NavLink to={href} className={clsx("card-content", styles.cardContent)}>
                                <div className={clsx("media", styles.media)}>
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