import {HTMLAttributes} from "react";
import {clsx} from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export default function Content({className, ...props}: Props) {
    return <div className={clsx("content", className)} {...props} />
}