import styles from "./style.module.css";
import {HTMLAttributes} from "react";
import {clsx} from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export default function DeveloperMode({className, ...props}: Props) {
    return (
        <div className={clsx(className, styles.developerMode)} {...props}>
            <section>DEVELOPER MODE</section>
        </div>
    )
}