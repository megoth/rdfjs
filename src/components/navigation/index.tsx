import {NavLink} from "react-router-dom";
import {clsx} from "clsx";
import {Fragment, useState} from "react";
import styles from "./style.module.css";
import {BiHomeHeart} from "react-icons/bi";
import {DemoLink, LOCAL_DEMOS, SOLID_DEMOS} from "../../constants.ts";

interface DemoGroup {
    children: Array<DemoLink>;
    className: string;
    text: string;
}

const links: Array<DemoGroup> = [
    {
        text: "Local",
        className: styles.local,
        children: LOCAL_DEMOS,
    },
    {
        text: "Solid",
        className: styles.solid,
        children: SOLID_DEMOS,
    }
]


export default function Navigation() {
    const [isActive, setIsActive] = useState<boolean>(false);
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <NavLink to={"/"} className={clsx("navbar-item", styles.homeLink)}>
                        <BiHomeHeart/>
                        <span>Home</span>
                    </NavLink>
                    <button className={clsx("navbar-burger", {
                        "is-active": isActive
                    })} aria-label="menu" aria-expanded="false" type="button"
                            onClick={() => setIsActive(!isActive)}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div className={clsx("navbar-menu", {
                    "is-active": isActive
                })}>
                    {links.map(({text, className, children}) => (
                        <Fragment key={className}>
                            <div className={clsx("navbar-item", className, styles.item, styles.groupLabel)}>{text}</div>
                            {children.map(({href, text}) => <NavLink to={href}
                                                                     key={href}
                                                                     className={({isActive}) => clsx("navbar-item", className, styles.item, {
                                                                         "is-active": isActive
                                                                     })}
                                                                     onClick={() => setIsActive(false)}>{text}</NavLink>)}
                        </Fragment>
                    ))}
                </div>
            </div>
        </nav>
    )
}