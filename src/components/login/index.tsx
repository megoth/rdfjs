import {PROVIDERS} from "../../constants.ts";

interface Props {
    login: (url: string) => void,
}

export default function Login({login}: Props) {
    const onProviderClick = (loginUrl: string) => () => login(loginUrl);

    const onCustomProviderClick = () => {
        const providerUrl = prompt("Please provide Solid Provider URL");
        if (!providerUrl || !(new URL(providerUrl).href)) return;
        login(providerUrl);
    };

    return (
        <div style={{display: "flex", gap: "0.5em", marginBottom: "1.5rem", flexWrap: "wrap"}}>
            {PROVIDERS.map((provider) => (
                <button key={provider.loginIri} type="button" className="button is-info"
                        onClick={onProviderClick(provider.loginIri)}>
                    {provider.label}
                </button>
            ))}
            <button type="button" className="button is-info" onClick={onCustomProviderClick}>
                Custom Solid Provider
            </button>
        </div>
    );
}