import {HTMLAttributes} from "react";
import styles from "./style.module.css";
import {clsx} from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export default function Footer({className, ...props}: Props) {
    return (
        <footer className={clsx(className, styles.footer)} {...props}>
            <div className={styles.footerItem}>
                Coded by <a href="https://icanhasweb.net">Arne Hassel</a>
            </div>
            <div className={styles.footerItem}>
                <a href="https://github.com/megoth/semtechjs-demo">GitHub repo</a>
            </div>
        </footer>
    )
}