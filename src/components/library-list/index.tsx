import {LIBRARIES, Library} from "../../constants.ts";
import {NavLink} from "react-router-dom";
import styles from "./style.module.css";
import {clsx} from "clsx";
import Card from "../card";

export interface Props {
    exclude?: Library;
}

export default function LibraryList({exclude}: Props) {
    const libraries = exclude
        ? LIBRARIES.filter((library) => library !== exclude)
        : LIBRARIES;
    return (
        <div className={clsx("menu", styles.libraryList)}>
            <ul className={clsx("columns", styles.columns)}>
                {libraries.map(({creator, href, icon, iconAlt, name}) => (
                    <NavLink key={href} to={href} className={clsx("column", styles.column)}>
                        <Card className={clsx("card", styles.card)}>
                            <div className="card-image">
                                <picture className={clsx("image", styles.image)}>
                                    <img src={icon} alt={iconAlt}/>
                                </picture>
                            </div>
                            <div className={clsx("card-content", styles.cardContent)}>
                                <div className={clsx("media", styles.media)}>
                                    <div className="media-content">
                                        <p className="title is-4">{name}</p>
                                        <p className="subtitle is-6">By {creator}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </NavLink>
                ))}
            </ul>
        </div>
    );
}