import {HTMLAttributes} from "react";
import {clsx} from "clsx";
import styles from "./style.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export default function Card({children, className, ...props}: Props) {
    return (
        <div className={clsx("card", styles.card, className)} {...props}>
            {children}
        </div>
    );
}