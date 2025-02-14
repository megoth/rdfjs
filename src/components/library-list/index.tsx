import {LIBRARIES, Library} from "../../constants";
import {NavLink} from "react-router-dom";
import styles from "./style.module.css";
import {clsx} from "clsx";
import Card from "../card";
import Columns from "../columns";

export interface Props {
    exclude?: Library;
}

export default function LibraryList({exclude}: Props) {
    const libraries = exclude
        ? LIBRARIES.filter((library) => library !== exclude)
        : LIBRARIES;
    return (
        <div className={clsx("menu", styles.libraryList)}>
            <Columns>
                {libraries.map(({creator, description, href, icon, iconAlt, name}) => (
                    <NavLink key={href} to={href}>
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
                            <p className={clsx("notification is-info", styles.notification)}>{description}</p>
                        </Card>
                    </NavLink>
                ))}
            </Columns>
        </div>
    );
}