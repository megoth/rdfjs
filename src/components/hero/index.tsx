import {clsx} from "clsx";
import styles from "./style.module.css";
import Container from "../container";
import {HTMLAttributes} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export default function Hero({className, children, ...props}: Props) {
    return (
        <div className={clsx("hero is-light is-small", styles.hero, className)} {...props}>
            <div className={"hero-body"}>
                <Container>
                    {children}
                </Container>
            </div>
        </div>
    )
}