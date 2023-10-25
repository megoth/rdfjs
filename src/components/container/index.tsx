import {HTMLAttributes} from "react";
import {clsx} from "clsx";
import styles from "./style.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export default function Container({className, children, ...props}: Props) {
    return (
        <section className={clsx("container", styles.container, className)} {...props}>{children}</section>
    );
}