import {NavLink} from "react-router-dom";
import {clsx} from "clsx";
import {HTMLAttributes, useState} from "react";
import styles from "./style.module.css";
import {LIBRARIES} from "../../constants.ts";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export default function Navigation({className, ...props}: Props) {
    const [menuIsActive, setMenuIsActive] = useState<boolean>(false);
    return (
        <nav className={clsx("navbar", className)} role="navigation" aria-label="main navigation" {...props}>
            <div className="container">
                <div className="navbar-brand">
                    <NavLink to={"/"} className={clsx("navbar-item", styles.homeLink)}
                             onClick={() => setMenuIsActive(false)}>
                        <img src="/rdfjs.png" alt={"Logo for rdf.js.org"}/>
                        <span>Home</span>
                    </NavLink>
                    <button className={clsx("navbar-burger", {
                        "is-active": menuIsActive
                    })} aria-label="menu" aria-expanded="false" type="button"
                            onClick={() => setMenuIsActive(!menuIsActive)}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div className={clsx("navbar-menu", {
                    "is-active": menuIsActive
                })}>
                    <div className="navbar-start">
                        {LIBRARIES.map(({href, name}) => (
                            <NavLink to={href} key={href}
                                     className={({isActive}) => clsx("navbar-item", {"is-active": isActive})}
                                     onClick={() => setMenuIsActive(false)}>
                                {name}
                            </NavLink>)
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}