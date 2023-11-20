import {HTMLAttributes} from "react";
import {clsx} from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
    error?: Error
}

export default function ErrorMessage({ className, error, ...props }: Props) {
    return (
        <article className={clsx("message is-danger is-light is-small", className)} {...props}>
            <div className="message-header">Error</div>
            <div className="message-body">{error?.message || error?.name || "Error happened (lost context)"}</div>
        </article>
    );
}