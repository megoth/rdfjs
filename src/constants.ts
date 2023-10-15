import {namedNode} from "rdflib";
import namespace from "solid-namespace";

export interface DemoLink {
    href: string;
    icon: string;
    iconAlt: string;
    slogan: string;
    subtitle?: string;
    text: string;
    title: string;
}

export const LOCAL_DEMOS: Array<DemoLink> = [
    {
        title: "rdflib.js",
        subtitle: "By rdflib.js team",
        href: "/rdflib#local",
        icon: "/linkeddata.png",
        iconAlt: "Logo for Read-Write Linked Data",
        slogan: "The OG JavaScript library to manage RDF data",
        text: "rdflib.js"
    },
    {
        title: "Linked Data Objects",
        subtitle: "By Jackson Morgan",
        href: "/ldo#local",
        icon: "/o-team.png",
        iconAlt: "Logo for O.team",
        slogan: "The newest kid on the block, using ShEx-shapes to ease the flow of handling RDF data",
        text: "LDO"
    },
    {
        title: "Soukai ODM",
        subtitle: "By Noel De Martin",
        href: "/soukai#solid",
        icon: "/soukai.svg",
        iconAlt: "Logo for Soukai ODM",
        slogan: "A JavaScript-based Object Document Mapper that also works with RDF",
        text: "Soukai"
    },
];

export const NS = namespace();
export const NAME_NODE = namedNode(NS.foaf("name"));


export const PROFILE_URI = "https://example.com/profile";
export const PROFILE_NODE = namedNode(PROFILE_URI);

export const PERSON_JSON = {
    "@id": PROFILE_URI,
    name: "Soukai Test"
};

export const PROFILE_TURTLE = `<${PROFILE_URI}> a <http://xmlns.com/foaf/0.1/Person>;
    <http://xmlns.com/foaf/0.1/name> "Test".
`;

interface Provider {
    label: string;
    logoSrc: string;
    loginIri: string;
    signupIri: string;
}

export const PROVIDERS: Array<Provider> = [
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

export const SOLID_DEMOS: Array<DemoLink> = [
    {
        title: "rdflib.js",
        subtitle: "By rdflib.js team",
        href: "/rdflib#solid",
        icon: "/linkeddata.png",
        iconAlt: "Logo for Read-Write Linked Data",
        slogan: "rdflib.js serves handy helpers to handle resource communication with Solid servers",
        text: "rdflib.js"
    },
    {
        title: "@ldo/solid-react",
        subtitle: "By Jackson Morgan",
        href: "/ldo#solid-react",
        icon: "/o-team.png",
        iconAlt: "Logo for O.team",
        slogan: "The creator behind LDO also offers a Solid/React integration",
        text: "@ldo/solid-react"
    },
    {
        title: "Inrupt JavaScript Client Libraries",
        subtitle: "By Inrupt",
        href: "/inrupt",
        icon: "/inrupt.webp",
        iconAlt: "Logo for Inrupt",
        slogan: "Inrupt offers an impressive suite of JavaScript libraries that offer developers a lot of features",
        text: "Inrupt"
    },
    {
        title: "Soukai Solid",
        subtitle: "By Noel De Martin",
        href: "/soukai#solid",
        icon: "/soukai-solid.svg",
        iconAlt: "Logo for Soukai Solid",
        slogan: "The creator of Soukai ODM has also created a Solid engine that allows you to use Soukai with Solid",
        text: "Soukai Solid"
    },
    {
        title: "Comunica",
        subtitle: "By Comunica team",
        href: "/comunica",
        icon: "/comunica.svg",
        iconAlt: "Logo for Comunica",
        slogan: "Comunica allows you to execute SPARQL queries for resources on the web",
        text: "Comunica"
    },
];

export const STORAGE_KEYS = {
    "PROFILE_RDFLIB": "profileRdflib",
    "PROFILE_LDO": "profileLdo",
    "PROFILE_SOUKAI": "profileSoukai",
}