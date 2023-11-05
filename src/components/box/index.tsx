import {HTMLAttributes} from "react";
import {clsx} from "clsx";
import styles from "./style.module.css";

export default function Box({children, className, ...props}: HTMLAttributes<HTMLDivElement>) {
    return <section className={clsx("box", styles.box, className)} {...props}>{children}</section>
}