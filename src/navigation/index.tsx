import {NavLink} from "react-router-dom";
import {clsx} from "clsx";
import Logo from "../logo";
import {useState} from "react";

type Link = {
    href: string;
    text: string;
}

const links: Array<Link> = [
    {
        href: "/rdflib",
        text: "rdflib"
    },
    {
        href: "/inrupt",
        text: "Inrupt"
    },
    {
        href: "/ldo",
        text: "LDO"
    },
    {
        href: "/ldo-solid-react",
        text: "LDO (Solid React)"
    },
]


export default function Navigation() {
    const [isActive, setIsActive] = useState<boolean>(false);
    return (
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <NavLink to={"/"} className="navbar-item"><Logo/></NavLink>
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
                    {links.map(({href, text}) => (
                        <NavLink to={href} key={href} className={({isActive}) => clsx("navbar-item", {
                            "is-active": isActive
                        })} onClick={() => setIsActive(false)}>{text}</NavLink>
                    ))}
                </div>
            </div>
        </nav>
    )
}