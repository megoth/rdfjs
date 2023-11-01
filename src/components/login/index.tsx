import {PROVIDERS} from "../../constants.ts";
import styles from "./style.module.css"
import {clsx} from "clsx";
import {HTMLAttributes} from "react";
import {getRedirectUrl} from "../../libs/location.ts";
import {LoginOptions} from "@ldo/solid-react/src/SolidAuthContext.ts";
import {useLocation} from "rakkasjs";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    login: (issuer: string, loginOptions?: LoginOptions) => Promise<void>,
    redirectId?: string;
}

export default function Login({className, login, redirectId, ...props}: Props) {
    const location = useLocation();

    const onProviderClick = async (issuerUrl: string) => {
        const redirectUrl = getRedirectUrl(location.current, redirectId);
        await login(issuerUrl, {redirectUrl})
    }

    const onCustomProviderClick = async () => {
        const providerUrl = prompt("Please provide Solid Provider URL");
        if (!providerUrl || !(new URL(providerUrl).href)) return;
        return onProviderClick(providerUrl);
    };

    return (
        <div className={styles.login}>
            {PROVIDERS.map((provider) => (
                <button key={provider.loginIri} type="button"
                        {...props}
                        className={clsx("button", className || "is-info")}
                        onClick={() => onProviderClick(provider.loginIri)}>
                    {provider.label}
                </button>
            ))}
            <button type="button"
                    {...props}
                    className={clsx("button", className || "is-info")}
                    onClick={() => onCustomProviderClick()}>
                Custom Solid Provider
            </button>
        </div>
    );
}