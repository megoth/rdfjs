import {PROVIDERS} from "../../constants.ts";
import styles from "./style.module.css"
import {clsx} from "clsx";
import {HTMLAttributes} from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    login: (url: string) => void,
}

export default function Login({className, login, ...props}: Props) {
    const onProviderClick = (loginUrl: string) => () => login(loginUrl);

    const onCustomProviderClick = () => {
        const providerUrl = prompt("Please provide Solid Provider URL");
        if (!providerUrl || !(new URL(providerUrl).href)) return;
        login(providerUrl);
    };

    return (
        <div className={styles.login}>
            {PROVIDERS.map((provider) => (
                <button key={provider.loginIri} type="button"
                        {...props}
                        className={clsx("button", className || "is-info")}
                        onClick={onProviderClick(provider.loginIri)}>
                    {provider.label}
                </button>
            ))}
            <button type="button"
                    {...props}
                    className={clsx("button", className || "is-info")}
                    onClick={onCustomProviderClick}>
                Custom Solid Provider
            </button>
        </div>
    );
}