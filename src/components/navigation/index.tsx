import {NavLink} from "react-router-dom";
import {clsx} from "clsx";
import {useState} from "react";
import styles from "./style.module.css";
import {BiHomeHeart} from "react-icons/bi";
import {LIBRARIES} from "../../constants.ts";

export default function Navigation() {
    const [menuIsActive, setMenuIsActive] = useState<boolean>(false);
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <NavLink to={"/"} className={clsx("navbar-item", styles.homeLink)}
                             onClick={() => setMenuIsActive(false)}>
                        <BiHomeHeart/>
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
                        {LIBRARIES.map(({href, text}) => (
                            <NavLink to={href} key={href}
                                     className={({isActive}) => clsx("navbar-item", {"is-active": isActive})}
                                     onClick={() => setMenuIsActive(false)}>
                                {text}
                            </NavLink>)
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}