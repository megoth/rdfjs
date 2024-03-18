import {clsx} from "clsx";
import {MenuItem} from "../../../constants.tsx";
import {NavLink, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from "./styles.module.css";

interface Props {
    align?: "end"
    id: string
    label: string
    items: Array<MenuItem>;
}

export default function NavigationDropdown({align, id, label, items}: Props) {
    const [menuIsActive, setMenuIsActive] = useState(false);
    const location = useLocation();
    useEffect(() => setMenuIsActive(false), [location]);

    return (
        <div className={clsx("navbar-item dropdown", styles.navbarItem, {
            "is-active": menuIsActive
        })}>
            <button className={clsx("navbar-link", styles.navbarLink)}
                    onClick={() => setMenuIsActive(!menuIsActive)}
                    aria-haspopup="true" aria-controls={id}>
                <span>{label}</span>
            </button>
            <div className={clsx("dropdown-menu", {
                [styles.dropdownMenuRightAligned]: align === "end"
            })} id={id} role="menu">
                <div className="dropdown-content">
                    {items.map(({href, name}) => (
                        <NavLink to={href} key={href}
                                 className={({isActive}) => clsx("dropdown-item", {"is-active": isActive})}>
                            {name}
                        </NavLink>)
                    )}
                </div>
            </div>
        </div>
    );
}