import {HTMLAttributes} from "react";
import {clsx} from "clsx";
import styles from "./styles.module.css";

export default function Columns({className, ...props}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={clsx(styles.columns, className)} {...props} />
    );
}