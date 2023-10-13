import {NavLink} from "react-router-dom";
import {clsx} from "clsx";
import {Fragment, useState} from "react";
import styles from "./style.module.css";


interface Link {
    href: string;
    text: string;
}

interface Container {
    children: Array<Link>;
    className: string;
    text: string;
}

const links: Array<Container> = [
    {
        text: "Local",
        className: styles.local,
        children: [
            {
                href: "/rdflib",
                text: "rdflib"
            },
            {
                href: "/ldo",
                text: "LDO"
            },
        ]
    },
    {
        text: "Solid",
        className: styles.solid,
        children: [
            {
                href: "/ldo-solid-react",
                text: "@ldo/solid-react"
            },
        ]
    }
]


export default function Navigation() {
    const [isActive, setIsActive] = useState<boolean>(false);
    return (
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <NavLink to={"/"} className="navbar-item">⛫ Home</NavLink>
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