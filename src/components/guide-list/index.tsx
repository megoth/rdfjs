import {Guide, GUIDES} from "../../constants.ts";
import {BsBook} from "react-icons/bs";
import {NavLink} from "react-router-dom";
import styles from "./style.module.css";
import {clsx} from "clsx";
import {useMemo} from "react";

export interface Props {
    exclude?: Guide
}

export default function GuideList({exclude}: Props) {
    const guides = useMemo(() => exclude
            ? GUIDES.filter((guide) => guide !== exclude)
            : GUIDES,
        [exclude])
    return (
        <div className={clsx("columns", styles.columns)}>
            {guides.map(({href, name}) => (
                <NavLink to={href} className={clsx("column", styles.column)}>
                    <div className="card">
                        <div className={"card-content"}>
                            <div className={clsx("media", styles.media)}>
                                <div className="media-left">
                                    <figure className="image is-48x48">
                                        <BsBook/>
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <p className="title is-4">{name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}