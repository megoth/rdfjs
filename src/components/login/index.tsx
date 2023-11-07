import {Provider, PROVIDERS} from "../../constants";
import styles from "./style.module.css"
import {clsx} from "clsx";
import {HTMLAttributes} from "react";
import {useHref, useLocation} from "react-router-dom";
import {hijackLogin} from "../../libs/location.ts";
import {LoginOptions} from "@ldo/solid-react/src/SolidAuthContext.ts";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    login: (issuer: string, loginOptions?: LoginOptions) => Promise<void>,
    providers?: Array<Provider>;
    redirectId?: string;
}

export default function Login({className, login, providers, redirectId, ...props}: Props) {
    const routerLocation = useLocation();
    const href = useHref(routerLocation.pathname);
    const onProviderClick = hijackLogin(login, routerLocation, location, href, redirectId);

    const onCustomProviderClick = async () => {
        const providerUrl = prompt("Please provide Solid Provider URL");
        if (!providerUrl || !(new URL(providerUrl).href)) return;
        await onProviderClick(providerUrl);
    };

    return (
        <div className={styles.login}>
            {(providers || PROVIDERS).map((provider) => (
                <button key={provider.loginIri} type="button"
                        {...props}
                        className={clsx("button", className || "is-info")}
                        onClick={() => onProviderClick(provider.loginIri)}>
                    {provider.label}
                </button>
            ))}
            {!providers && <button type="button"
                    {...props}
                    className={clsx("button", className || "is-info")}
                    onClick={onCustomProviderClick}>
                Custom Solid Provider
            </button>}
        </div>
    );
}