import {NavLink} from "react-router-dom";

type Link = {
    href: string;
    text: string;
}

const links: Array<Link> = [
    {
        href: "/",
        text: "Frontpage"
    },
    {
        href: "/ldo",
        text: "LDO"
    },
]


export default function Navigation() {
    return (
        <nav>
            <ul>
                {links.map(({href, text}) => (
                    <li key={href}>
                        <NavLink to={href}>
                            <a>{text}</a>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}