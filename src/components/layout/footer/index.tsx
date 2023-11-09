import {HTMLAttributes} from "react";
import styles from "./style.module.css";
import {clsx} from "clsx";
import {GUIDES} from "../../../constants";
import {NavLink} from "react-router-dom";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export default function Footer({className, ...props}: Props) {
    return (
        <footer className={clsx(className, styles.footer)} {...props}>
            <div className={styles.footerItem}>
                <nav className={styles.footerNav}>
                    <span>Guides: </span>
                    {GUIDES.map(({href, name}) => (
                        <NavLink key={href} to={href}>{name}</NavLink>
                    ))}
                </nav>
            </div>
            <nav className={styles.footerMeta}>
                <div className={styles.footerItem}>
                    <a href="https://github.com/megoth/semtechjs-demo">GitHub repo</a>
                </div>
                <div className={styles.footerItem}>
                    <a href="https://icanhasweb.net">Coded by Arne Hassel</a>
                </div>
                <div className={styles.footerItem}>
                    <a href="https://www.flaticon.com/free-icons/financing" title="financing icons">
                        Financing icons created by surang - Flaticon
                    </a>
                </div>
            </nav>
        </footer>
    )
}