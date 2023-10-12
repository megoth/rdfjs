import {NavLink} from "react-router-dom";
import {clsx} from "clsx";

type Link = {
    href: string;
    text: string;
}

const links: Array<Link> = [
    {
        href: "/ldo",
        text: "LDO"
    },
    {
        href: "/rdflib",
        text: "rdflib"
    },
    {
        href: "/inrupt",
        text: "Inrupt"
    },
]


export default function Navigation() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <NavLink to={"/"} className={({isActive}) => clsx("navbar-item", {
                    "is-active": isActive
                })}>DEMO</NavLink>
            </div>
            <div className="navbar-menu">
                {links.map(({href, text}) => (
                    <NavLink to={href} key={href} className={({isActive}) => clsx("navbar-item", {
                        "is-active": isActive
                    })}>
                        <a>{text}</a>
                    </NavLink>
                ))}
            </div>
        </nav>
    )
}