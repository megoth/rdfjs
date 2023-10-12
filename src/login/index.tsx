interface Props {
    login: (url: string) => void,
}

export type Provider = {
    label: string;
    logoSrc: string;
    loginIri: string;
    signupIri: string;
};

const providers: Array<Provider> = [
    {
        label: "Inrupt Pod Spaces",
        logoSrc: "/logos/inrupt-ps-logo.png",
        loginIri: "https://broker.pod.inrupt.com/",
        signupIri: "https://signup.pod.inrupt.com/",
    },
    {
        label: "solidweb.me",
        logoSrc: "/logos/solid-emblem.svg",
        loginIri: "https://solidweb.me",
        signupIri: "https://solidweb.me/idp/register/",
    },
    {
        label: "solidcommunity.net",
        logoSrc: "/logos/solid-emblem.svg",
        loginIri: "https://solidcommunity.net/",
        signupIri: "https://solidcommunity.net/register",
    },
    {
        label: "inrupt.net",
        logoSrc: "/logos/solid-emblem.svg",
        loginIri: "https://inrupt.net/",
        signupIri: "https://inrupt.net/register",
    },
];

export default function Login({login}: Props) {
    return (
        <div style={{display: "flex", gap: "0.5em"}}>
            {providers.map((provider) => (
                <button key={provider.loginIri} type="button"
                        className="button is-info"
                        onClick={() => login(provider.loginIri)}>{provider.label}</button>
            ))}
        </div>
    );
}