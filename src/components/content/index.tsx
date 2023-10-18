import {HTMLAttributes} from "react";
import {clsx} from "clsx";
import styles from "./style.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export default function Content({className, ...props}: Props) {
    return <div className={clsx("content", className, styles.content)} {...props} />
}