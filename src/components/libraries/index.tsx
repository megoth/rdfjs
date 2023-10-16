import {LIBRARIES} from "../../constants.ts";
import {NavLink} from "react-router-dom";
import styles from "./style.module.css";
import {clsx} from "clsx";

export default function Libraries() {
    return (
        <div className={clsx("menu", styles.menu)}>
            <ul className="menu-list">
                {LIBRARIES.map(({href, name}) => (
                    <li key={href}>
                        <NavLink to={href}>{name}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}