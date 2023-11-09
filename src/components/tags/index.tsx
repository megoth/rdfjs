import {HTMLAttributes} from "react";
import {clsx} from "clsx";
import styles from "./styles.module.css";
import TagComponent from "../tag";

type Tag = ReturnType<typeof TagComponent>;

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    children: Tag | Array<Tag>
}

export default function Tags({children, className, ...props}: Props) {
    return <div className={clsx("tags", styles.tags, className)} {...props}>
        {children}
    </div>
}