import {namedNode} from "rdflib";
import namespace from "solid-namespace";
import {RatingScore} from "./components/rating";

export interface LibraryLink {
    creator: string;
    href: string;
    icon: string;
    iconAlt: string;
    name: string;
    review?: Array<RatingScore>;
    text: string;
    websiteName: string;
    websiteUrl: string;
}

export const LIBRARY_RDFLIB: LibraryLink = {
    creator: "rdflib.js team",
    href: "/rdflib",
    icon: "/linkeddata.png",
    iconAlt: "Logo for Read-Write Linked Data",
    name: "rdflib.js",
    review: [3, 2, 2, 4, 2.5],
    text: "rdflib.js",
    websiteName: "GitHub repo",
    websiteUrl: "https://github.com/linkeddata/rdflib.js/"
};
export const LIBRARY_LDO: LibraryLink = {
    creator: "Jackson Morgan",
    href: "/ldo",
    icon: "/o-team.png",
    iconAlt: "Logo for O.team",
    name: "Linked Data Objects",
    text: "LDO",
    websiteName: "GitHub repo",
    websiteUrl: "https://github.com/o-development/ldo/"
};
export const LIBRARY_INRUPT = {
    creator: "Inrupt",
    href: "/inrupt",
    icon: "/inrupt.webp",
    iconAlt: "Logo for Inrupt",
    name: "Inrupt's JavaScript client libraries",
    text: "Inrupt",
    websiteName: "Official documentation",
    websiteUrl: "https://docs.inrupt.com/developer-tools/javascript/client-libraries/"
};
export const LIBRARY_SOUKAI = {
    creator: "Noel De Martin",
    href: "/soukai",
    icon: "/soukai.svg",
    iconAlt: "Logo for Soukai ODM",
    name: "Soukai ODM",
    text: "Soukai",
    websiteName: "Official website",
    websiteUrl: "https://soukai.js.org/"
};
export const LIBRARY_COMUNICA = {
    creator: "IDLab at Ghent University",
    href: "/comunica",
    icon: "/comunica.svg",
    iconAlt: "Logo for Comunica",
    name: "Comunica",
    text: "Comunica",
    websiteName: "Official website",
    websiteUrl: "https://comunica.dev/"
};
export const LIBRARIES: Array<LibraryLink> = [
    LIBRARY_RDFLIB,
    LIBRARY_LDO,
    LIBRARY_INRUPT,
    LIBRARY_SOUKAI,
    LIBRARY_COMUNICA,
];

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
        href: "/rdflib#local",
        icon: "/linkeddata.png",
        iconAlt: "Logo for Read-Write Linked Data",
        slogan: "The OG JavaScript library to manage RDF data",
        text: "rdflib.js"
    },
    {
        title: "LDO",
        href: "/ldo#local",
        icon: "/o-team.png",
        iconAlt: "Logo for O.team",
        slogan: "The newest kid on the block, using ShEx-shapes to ease the flow of handling RDF data",
        text: "LDO"
    },
    {
        title: "Soukai",
        href: "/soukai#local",
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

export const RATING_CRITERIA: Array<[string, string]> = [
    ["developerExperience", "Developer Experience"],
    ["docs", "Documentation"],
    ["communitySupport", "Community & Support"],
    ["maturity", "Maturity"],
    ["overall", "Overall"]
];

export const SOLID_DEMOS: Array<DemoLink> = [
    {
        title: "rdflib.js",
        href: "/rdflib#solid",
        icon: "/linkeddata.png",
        iconAlt: "Logo for Read-Write Linked Data",
        slogan: "rdflib.js serves handy helpers to handle resource communication with Solid servers",
        text: "rdflib.js"
    },
    {
        title: "@ldo/solid-react",
        href: "/ldo#solid-react",
        icon: "/o-team.png",
        iconAlt: "Logo for O.team",
        slogan: "The creator behind LDO also offers a Solid/React integration",
        text: "@ldo/solid-react"
    },
    {
        title: "Inrupt JavaScript Client Libraries",
        href: "/inrupt#solid",
        icon: "/inrupt.webp",
        iconAlt: "Logo for Inrupt",
        slogan: "Inrupt offers an impressive suite of JavaScript libraries that offer developers a lot of features",
        text: "Inrupt"
    },
    {
        title: "Soukai Solid",
        href: "/soukai#solid",
        icon: "/soukai-solid.svg",
        iconAlt: "Logo for Soukai Solid",
        slogan: "The creator of Soukai ODM has also created a Solid engine that allows you to use Soukai with Solid",
        text: "Soukai Solid"
    },
    {
        title: "Comunica",
        href: "/comunica#solid",
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