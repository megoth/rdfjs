import {HTMLAttributes} from "react";
import {clsx} from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export default function Box({children, className, ...props}: Props) {
    return <section className={clsx("box", className)} {...props}>{children}</section>
}