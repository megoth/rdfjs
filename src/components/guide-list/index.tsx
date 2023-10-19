import {GUIDES} from "../../constants.ts";
import {BsBook} from "react-icons/bs";
import {NavLink} from "react-router-dom";
import styles from "./style.module.css";
import {clsx} from "clsx";

export default function GuideList() {
    return (
        <div className="columns">
            {GUIDES.map(({href, fullName}) => (
                <NavLink to={href} className={"column"}>
                    <div className="card">
                        <div className={"card-content"}>
                            <div className={clsx("media", styles.media)}>
                                <div className="media-left">
                                    <figure className="image is-48x48">
                                        <BsBook/>
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <p className="title is-4">{fullName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}