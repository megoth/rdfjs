import {HTMLAttributes} from "react";
import {clsx} from "clsx";

export default function Box({children, className, ...props}: HTMLAttributes<HTMLDivElement>) {
    return <section className={clsx("box", className)} {...props}>{children}</section>
}