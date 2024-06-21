import {RatingScore} from "./components/rating";
import {ReactNode} from "react";

export interface MenuItem {
    href: string;
    name: string;
}

export interface Guide extends MenuItem {
    href: string;
    logo: string;
    logoAlt: string;
    logoPreferredHeight: number;
    name: string;
    recommendations: Array<Recommendation>;
}

export const CRDT_GUIDE: Guide = {
    href: "/crdt",
    logo: "./crdt.png",
    logoAlt: "Logo of CRDT",
    logoPreferredHeight: 200,
    name: "CRDT",
    recommendations: [{
        title: "CRDT.tech",
        href: "https://crdt.tech/",
        note: "Good website to learn about CRDT",
        type: "URL"
    }, {
        title: "An introduction to Conflict-Free Replicated Data Types",
        href: "https://lars.hupel.info/topics/crdt/01-intro/",
        note: "A good, interactive tutorial series about CRDT (suggested by gaz009)",
        type: "URL"
    }, {
        title: "CRDT on Wikipedia",
        href: "https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type",
        type: "URL"
    }, {
        title: "Awesome CRDT",
        href: "https://github.com/alangibson/awesome-crdt",
        note: "Lots of good resources on CRDT",
        type: "URL"
    }, {
        title: "dotJS 2019 - James Long - CRDTs for Mortals",
        href: "https://www.youtube.com/watch?v=DEcwa68f-jY",
        note: "Nice presentation of CRDT (suggested by Noel De Martin)",
        type: "YouTube"
    }, {
        title: "Peritext - A CRDT for rich-text collaboration",
        href: "https://www.inkandswitch.com/peritext/",
        note: "One implementation of CRDT using rich-text editors",
        type: "URL"
    }, {
        title: "CRDTs: The Hard Parts",
        href: "https://www.youtube.com/watch?v=x7drE24geUw",
        note: "A good talk by Martin Kleppman (on of the creators of Peritext) that goes into details of his work",
        type: "YouTube"
    }, {
        title: "Local-first software",
        href: "https://www.inkandswitch.com/local-first/",
        note: "A good research paper on CRDT (suggested by Noel De Martin)",
        type: "YouTube"
    }],
};
export const JAVASCRIPT_GUIDE: Guide = {
    href: "/javascript",
    logo: "./javascript.png",
    logoAlt: "Logo of JavaScript",
    logoPreferredHeight: 192,
    name: "JavaScript",
    recommendations: [{
        title: "JavaScript Guide | MDN",
        href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
        note: "Lots of good resources to get you started learning JavaScript",
        type: "URL"
    }, {
        title: "The Modern JavaScript Tutorial",
        href: "https://javascript.info/",
        note: "Many good tutorials to get you started on JavaScript",
        type: "URL"
    }, {
        title: "All I need to know about ECMAScript modules",
        href: "https://www.valentinog.com/blog/es-modules/",
        note: "Good read on ES modules",
        type: "URL"
    }, {
        title: "wtf.js",
        href: "https://wtfjs.com/",
        note: "Fun site with lots of weird JS-code",
        type: "URL"
    }],
};
export const RDF_GUIDE: Guide = {
    href: "/rdf",
    logo: "./rdf.png",
    logoAlt: "Logo of RDF",
    logoPreferredHeight: 192,
    name: "RDF",
    recommendations: [{
        title: "A brief introduction to linked data",
        href: "https://ontola.io/blog/what-is-linked-data",
        type: "URL"
    }, {
        title: "Stardog Academy Fundamentals: Getting Started with RDF & SPARQL",
        href: "https://www.youtube.com/watch?v=bDxclRhDb-o",
        type: "YouTube"
    }, {
        title: "Tim Berners-Lee: The next Web of open, linked data",
        href: "https://www.youtube.com/watch?v=OM6XIICm_qo",
        note: "Old but good",
        type: "YouTube"
    }, {
        title: "RDF Primer",
        href: "https://www.w3.org/TR/rdf-primer/",
        type: "URL"
    }, {
        title: "RDF 1.1 Concepts and Abstract Syntax",
        href: "https://www.w3.org/TR/rdf11-concepts/",
        note: "RDF specification",
        type: "URL",
    }, {
        title: "RDF 1.1 Semantics",
        href: "https://www.w3.org/TR/rdf11-mt/",
        note: "RDFS specification",
        type: "URL"
    }, {
        title: "Intro to the Semantic Web",
        href: "https://www.youtube.com/watch?v=OGg8A2zfWKg",
        note: "Old but good",
        type: "YouTube"
    }, {
        title: "What is Linked Data?",
        href: "https://www.youtube.com/watch?v=4x_xzT5eF5Q",
        note: "If you liked \"Intro to the Semantic Web\", you'll like this one too",
        type: "YouTube"
    }, {
        title: "An Introduction to the Semantic Web",
        href: "https://www.youtube.com/watch?v=V6BR9DrmUQA",
        type: "YouTube"
    }, {
        title: "What is the Resource Description Framework (RDF)?",
        href: "https://www.youtube.com/watch?v=NzzAxEPpuJQ",
        type: "YouTube"
    }, {
        title: "OWL 2 Web Ontology Language - Document Overview (Second Edition)",
        href: "https://www.w3.org/TR/owl2-overview/",
        note: "If you're into formal definitions and inferring knowledge, you'll like this",
        type: "URL"
    }],
};
export const REACT_GUIDE: Guide = {
    href: "/react",
    logo: "./react.svg",
    logoAlt: "Logo of React",
    logoPreferredHeight: 192,
    name: "React",
    recommendations: [{
        title: "React",
        href: "https://react.dev/",
        note: "Official website",
        type: "URL"
    }, {
        title: "Writing Markup with JSX",
        href: "https://react.dev/learn/writing-markup-with-jsx",
        note: "Documentation for JSX",
        type: "URL"
    }, {
        title: "Built-in React Hooks",
        href: "https://react.dev/reference/react",
        note: "Documentation for React Hooks",
        type: "URL"
    }, {
        title: "React State Management Libraries and How to Choose",
        href: "https://daveceddia.com/react-state-management/",
        note: "An interesting long-read by Dave Ceddia on state management in React",
        type: "URL"
    }, {
        title: "Tao of React - Software Design, Architecture & Best Practices",
        href: "https://alexkondov.com/tao-of-react/",
        note: "Good long-read by Alex Kondov with a lot of tips for React",
        type: "URL"
    }, {
        title: "React Tutorial for Beginners",
        href: "https://www.youtube.com/watch?v=SqcY0GlETPk",
        note: "Long but good introduction video",
        type: "YouTube"
    }, {
        title: "How A Small Team of Developers Created React at Facebook | React.js: The Documentary",
        href: "https://www.youtube.com/watch?v=8pDqJVdNa44",
        note: "It seems successful tools need their own documentary. This one is quite good though.",
        type: "YouTube"
    }],
};
export const SHEX_GUIDE: Guide = {
    href: "/shex",
    logo: "./shex.png",
    logoAlt: "Logo of ShEx",
    logoPreferredHeight: 192,
    name: "ShEx",
    recommendations: [{
        title: "shex.io",
        href: "https://shex.io/",
        note: "Official website",
        type: "URL"
    }, {
        title: "Shape Expressions (ShEx) 2.1 Primer",
        href: "https://shex.io/shex-primer/",
        type: "URL"
    }, {
        title: "Shape Expressions Language 2.1",
        href: "https://shex.io/shex-semantics/",
        note: "Specification",
        type: "URL"
    }, {
        title: "Lotico Data Shapes Event",
        href: "https://www.youtube.com/watch?v=M3lpHLn__Cc",
        note: "Long, but good explanation of ShEx",
        type: "YouTube"
    }, {
        title: "Shapes Constraint Language (SHACL)",
        href: "https://www.w3.org/TR/shacl/",
        note: "The specification for SHACL, an alternative to ShEx. SHACL has more features than ShEx, but is IMHO harder to get into.",
        type: "URL"
    }],
};
export const SOLID_GUIDE: Guide = {
    href: "/solid",
    logo: "./solid.svg",
    logoAlt: "Logo of Solid",
    logoPreferredHeight: 192,
    name: "Solid",
    recommendations: [{
        title: "solidproject.org",
        href: "https://solidproject.org/",
        note: "Official website",
        type: "URL"
    }, {
        title: "Solid Community Forum",
        href: "https://forum.solidproject.org/",
        note: "Official forum of Solid",
        type: "URL"
    }, {
        title: "solid/chat",
        href: "https://app.gitter.im/#/room/#solid_chat:gitter.im",
        note: "Official chat room for Solid, using the Matrix protocol",
        type: "URL"
    }, {
        title: "solidProjectSpace",
        href: "https://app.gitter.im/#/room/#solidprojectspace:matrix.org",
        note: "More chat rooms using the Matrix protocol",
        type: "URL"
    }, {
        title: "What is Solid?",
        href: "https://www.womenofsolid.org/what-is-solid",
        note: "A good introductory read to Solid by Virginia Balseiro",
        type: "URL"
    }, {
        title: "How Solid will give back control over your data",
        href: "https://www.youtube.com/watch?v=V-9cOJ6SUHI",
        note: "Good introduction to Solid",
        type: "YouTube"
    }, {
        title: "Inherently Social, Decentralised, and for Everyone",
        href: "https://csarven.ca/presentations/inherently-social-decentralised-and-for-everyone",
        note: "A good presentation by Sarven Capadisli on Solid and the motivation behind it",
        type: "URL"
    }, {
        title: "Solid Protocol",
        href: "https://solidproject.org/TR/protocol",
        note: "Solid specification",
        type: "URL"
    }, {
        title: " Your Personal Linked Data Graphs with Solid - Ruben Verborgh ",
        href: "https://www.youtube.com/watch?v=lkYrwbxCCHE",
        note: "Long but good",
        type: "YouTube"
    }, {
        title: "Web Access Control",
        href: "https://solidproject.org/TR/wac",
        note: "WAC specification",
        type: "URL"
    }, {
        title: "Access Control Policy (ACP)",
        href: "https://solid.github.io/authorization-panel/acp-specification/",
        note: "ACP specification",
        type: "URL"
    }, {
        title: "Solid-OIDC",
        href: "https://solid.github.io/solid-oidc/",
        note: "Solid-OIDC specification",
        type: "URL"
    }, {
        title: "Solid Project (Eventbrite)",
        href: "https://www.eventbrite.co.uk/o/solid-project-30026804546",
        note: "Project site at Eventbrite where they post when there are upcoming Solid World events",
        type: "URL"
    }, {
        title: "Solid Project (Vimeo)",
        href: "https://vimeo.com/solidworld",
        note: "Previous recordings of Solid Word events",
        type: "URL"
    }, {
        title: "Using all flavours of Solid",
        href: "https://michielbdejong.com/blog/29",
        note: "Interesting read by Michiel B. de Jong",
        type: "URL"
    }, {
        title: "r/solid",
        href: "https://www.reddit.com/r/SOLID/",
        note: "Subreddit for Solid",
        type: "URL"
    }, {
        title: "Women of Solid",
        href: "https://www.womenofsolid.org/",
        note: "A community for women that are interested in Solid",
        type: "URL"
    }, {
        title: "The future of the decentralized web",
        href: "https://medium.com/berkman-klein-center/the-future-of-the-decentralized-web-707915f12360",
        note: "An interesting long-read on Solid",
        type: "URL"
    }, {
        title: "Solid - A Better Web (Simply Explained)",
        href: "https://www.youtube.com/watch?v=qWVTjMsv7AE",
        note: "If you only have five minutes",
        type: "YouTube"
    }],
};
export const SPARQL_GUIDE: Guide = {
    href: "/sparql",
    logo: "./sparql.svg",
    logoAlt: "Logo of SPARQL",
    logoPreferredHeight: 192,
    name: "SPARQL",
    recommendations: [{
        title: "Learn SPARQL",
        href: "https://sparql.dev/",
        note: "A very good guide on learning SPARQL",
        type: "URL"
    }, {
        title: "SPARQL 1.1 Query Language",
        href: "https://www.w3.org/TR/sparql11-query/",
        note: "SPARQL specification",
        type: "URL"
    }, {
        title: "SPARQL 1.1 Update",
        href: "https://www.w3.org/TR/sparql11-update/",
        note: "SPARQL Update specification",
        type: "URL"
    }, {
        title: "sparql.org",
        href: "https://sparql.org/",
        note: "Lots of good resources",
        type: "URL"
    }, {
        title: "Stardog Academy Fundamentals: Getting Started with RDF & SPARQL",
        href: "https://www.youtube.com/watch?v=bDxclRhDb-o",
        type: "YouTube"
    }, {
        title: "Querying Wikidata with SPARQL for Absolute Beginners",
        href: "https://www.youtube.com/watch?v=kJph4q0Im98",
        type: "YouTube"
    }],
};
export const TYPESCRIPT_GUIDE: Guide = {
    href: "/typescript",
    logo: "./typescript.png",
    logoAlt: "Logo of TypeScript",
    logoPreferredHeight: 192,
    name: "TypeScript",
    recommendations: [{
        title: "TypeScript: JavaScript With Syntax For Types",
        href: "https://www.typescriptlang.org/",
        note: "Official website",
        type: "URL"
    }, {
        title: "TypeScript Tutorial for Beginners",
        href: "https://www.youtube.com/watch?v=d56mG7DezGs",
        note: "Long, but good introduction",
        type: "YouTube"
    }, {
        title: "TypeScript Origins: The Documentary",
        href: "https://www.youtube.com/watch?v=U6s2pdxebSo",
        note: "Interesting documentary if you're into that stuff",
        type: "YouTube"
    }, {
        title: "The TypeScript Tax",
        href: "https://medium.com/javascript-scene/the-typescript-tax-132ff4cb175b",
        note: "Interesting long-read from Eric Elliot on the cost of using TypeScript",
        type: "URL"
    }, {
        title: "TypeScript at Slack",
        href: "https://slack.engineering/typescript-at-slack/",
        note: "Interesting text from Felix Rieseberg with some positive reflections on using TypeScript",
        type: "URL"
    }],
};

export const GUIDES = [
    RDF_GUIDE,
    SHEX_GUIDE,
    SPARQL_GUIDE,
    SOLID_GUIDE,
    JAVASCRIPT_GUIDE,
    TYPESCRIPT_GUIDE,
    REACT_GUIDE,
    CRDT_GUIDE,
];

export interface Library extends MenuItem {
    creator: string;
    creatorUrl: string;
    href: string;
    icon: string;
    iconAlt: string;
    iconPreferredHeight: number;
    name: string;
    review?: Array<RatingScore>;
    text: string;
    websiteName: string;
    websiteUrl: string;
}

export const LIBRARY_COMUNICA: Library = {
    creator: "IDLab at Ghent University",
    creatorUrl: "https://www.ugent.be/ea/idlab/en",
    href: "/comunica",
    icon: "/comunica.svg",
    iconAlt: "Logo for Comunica",
    iconPreferredHeight: 240,
    name: "Comunica",
    text: "Comunica",
    websiteName: "Official website",
    websiteUrl: "https://comunica.dev/"
};
export const LIBRARY_LDO: Library = {
    creator: "O.team (Jackson Morgan)",
    creatorUrl: "https://www.o.team/",
    href: "/ldo",
    icon: "/ldo.png",
    iconAlt: "Logo for LDO project",
    iconPreferredHeight: 192,
    name: "Linked Data Objects",
    review: [4, 3, 3, 2, 3.5],
    text: "LDO",
    websiteName: "Official website",
    websiteUrl: "https://ldo.js.org/"
};
export const LIBRARY_INRUPT: Library = {
    creator: "Inrupt",
    creatorUrl: "https://inrupt.com",
    href: "/inrupt",
    icon: "/inrupt.webp",
    iconAlt: "Logo for Inrupt",
    iconPreferredHeight: 192,
    name: "Inrupt's JavaScript client libraries",
    review: [3, 4, 3, 3, 3],
    text: "Inrupt",
    websiteName: "Official documentation",
    websiteUrl: "https://docs.inrupt.com/developer-tools/javascript/client-libraries/"
};
export const LIBRARY_LDKIT: Library = {
    creator: "Karel Klíma",
    creatorUrl: "https://www.karelklima.cz/",
    href: "/ldkit",
    icon: "/ldkit.png",
    iconAlt: "Logo for LDkit",
    iconPreferredHeight: 96,
    name: "LDkit",
    text: "LDkit",
    websiteName: "Official website",
    websiteUrl: "https://ldkit.io/"
};
export const LIBRARY_M_LD: Library = {
    creator: "George Svarovsky",
    creatorUrl: "https://github.com/gsvarovsky",
    href: "/m-ld",
    icon: "/m-ld.svg",
    iconAlt: "Logo for m-ld",
    iconPreferredHeight: 192,
    name: "m-ld",
    text: "m-ld",
    websiteName: "Official website",
    websiteUrl: "https://m-ld.org/"
};
export const LIBRARY_RDF_EXT: Library = {
    creator: "Thomas Bergwinkl",
    creatorUrl: "https://github.com/bergos/",
    href: "/rdf-ext",
    icon: "/rdf-ext.png",
    iconAlt: "Logo for RDF-Ext",
    iconPreferredHeight: 200,
    name: "RDF-Ext",
    text: "RDF-Ext",
    websiteName: "Official website",
    websiteUrl: "https://rdf-ext.org/"
};
export const LIBRARY_RDFLIB: Library = {
    creator: "rdflib.js team",
    creatorUrl: "https://github.com/linkeddata/rdflib.js/graphs/contributors",
    href: "/rdflib",
    icon: "/rdf.svg",
    iconAlt: "Logo for Read-Write Linked Data",
    iconPreferredHeight: 192,
    name: "rdflib.js",
    review: [2, 2, 3, 4, 2.5],
    text: "rdflib.js",
    websiteName: "GitHub repo",
    websiteUrl: "https://github.com/linkeddata/rdflib.js/"
};
export const LIBRARY_QUADSTORE: Library = {
    creator: "Jacopo Scazzosi ",
    creatorUrl: "https://github.com/jacoscaz",
    href: "/quadstore",
    icon: "/quadstore-logo.png",
    iconAlt: "Logo for Quadstore",
    iconPreferredHeight: 150,
    name: "Quadstore",
    text: "Quadstore",
    websiteName: "GitHub repo",
    websiteUrl: "https://github.com/jacoscaz/quadstore"
};
export const LIBRARY_SOUKAI: Library = {
    creator: "Noel De Martin",
    creatorUrl: "https://noeldemartin.com/",
    href: "/soukai",
    icon: "/soukai.svg",
    iconAlt: "Logo for Soukai",
    iconPreferredHeight: 192,
    name: "Soukai",
    text: "Soukai",
    websiteName: "Official website",
    websiteUrl: "https://soukai.js.org/"
};
export const LIBRARIES: Array<Library> = [
    LIBRARY_RDFLIB,
    LIBRARY_LDO,
    LIBRARY_INRUPT,
    LIBRARY_SOUKAI,
    LIBRARY_COMUNICA,
    LIBRARY_RDF_EXT,
    LIBRARY_M_LD,
    LIBRARY_QUADSTORE,
    LIBRARY_LDKIT,
];

export interface Demo {
    href: string;
    icon?: string;
    iconAlt?: string;
    library: Library;
    slogan: ReactNode;
    subtitle?: string;
    text: string;
    title: string;
}

export const LOCAL_DEMOS: Array<Demo> = [
    {
        title: "rdflib.js",
        href: "/rdflib#local",
        library: LIBRARY_RDFLIB,
        slogan: <>The <abbr title="Original">OG</abbr> JavaScript library to manage RDF data</>,
        text: "rdflib.js"
    },
    {
        title: "LDO",
        href: "/ldo#local",
        library: LIBRARY_LDO,
        slogan: "The newest kid on the block, using ShEx-shapes to ease the flow of handling RDF data",
        text: "LDO"
    },
    {
        title: "Inrupt JavaScript Client Libraries",
        href: "/inrupt#local",
        library: LIBRARY_INRUPT,
        slogan: "Inrupt's JS libraries can be used locally using N3.js",
        text: "Inrupt"
    },
    {
        title: "Soukai",
        href: "/soukai#local",
        library: LIBRARY_SOUKAI,
        slogan: "A JavaScript-based Object Document Mapper that also works with RDF",
        text: "Soukai"
    },
    {
        title: "RDF-Ext",
        href: "/rdf-ext#local",
        library: LIBRARY_RDF_EXT,
        slogan: "A JavaScript RDF SDK that allows us to parse and serialize locally",
        text: "RDF-Ext"
    },
    {
        title: "Quadstore",
        href: "/quadstore#local",
        library: LIBRARY_QUADSTORE,
        slogan: "Quadstore can be easily used locally using the BrowserLevel library",
        text: "Quadstore"
    },
];

export const P2P_DEMOS: Array<Demo> = [{
    title: "m-ld",
    href: "/m-ld#P2PDemo",
    icon: "/m-ld.svg",
    iconAlt: "Logo for m-ld",
    library: LIBRARY_M_LD,
    slogan: "m-ld is built for handling RDF graphs across peer-to-peer networks",
    text: "m-ld"
}];


export const PROFILE_URI = "https://megothcapgemini.solidcommunity.net/profile/card#me";

export const PROFILE_JSON = {
    "@id": PROFILE_URI,
    name: "Test"
};

export const PROFILE_TURTLE = `@prefix foaf: <http://xmlns.com/foaf/0.1/> .

<${PROFILE_URI}> foaf:name "Test".`;

interface Provider {
    label: string;
    logoSrc: string;
    loginIri: string;
    signupIri: string;
}

export const PROVIDERS: Array<Provider> = [
    {
        label: "solidcommunity.net",
        logoSrc: "/logos/solid-emblem.svg",
        loginIri: "https://solidcommunity.net/",
        signupIri: "https://solidcommunity.net/register",
    },
    {
        label: "solidweb.me",
        logoSrc: "/logos/solid-emblem.svg",
        loginIri: "https://solidweb.me",
        signupIri: "https://solidweb.me/idp/register/",
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

interface BaseRecommendation {
    href: string;
    note?: string;
    title: string;
}

export interface URLRecommendation extends BaseRecommendation {
    type: "URL";
}

export interface YouTubeRecommendation extends BaseRecommendation {
    type: "YouTube";
}

export type Recommendation = URLRecommendation | YouTubeRecommendation;

interface Serialization {
    name: string;
    url: string;
    logo: string;
}

export const SERIALIZATIONS: Array<Serialization> = [{
    name: "Turtle",
    url: "https://www.w3.org/TR/turtle/",
    logo: "/turtle.svg"
}, {
    name: "JSON-LD",
    url: "https://json-ld.org/",
    logo: "/json-ld-logo-64.png"
}, {
    name: "RDFa",
    url: "https://rdfa.info/",
    logo: "/rdfa.svg"
}, {
    name: "RDF/XML",
    url: "https://www.w3.org/TR/rdf-syntax-grammar/",
    logo: "/rdf-xml.svg"
}, {
    name: "N-Triples",
    url: "https://www.w3.org/TR/n-triples/",
    logo: "/n-triple.svg"
}, {
    name: "N3 (Notation 3)",
    url: "https://www.w3.org/TeamSubmission/n3/",
    logo: "/n3_small.gif"
}]

export const SOLID_DEMOS: Array<Demo> = [
    {
        title: "rdflib.js",
        href: "/rdflib#solid",
        library: LIBRARY_RDFLIB,
        slogan: "rdflib.js serves handy helpers to handle resource communication with Solid servers",
        text: "rdflib.js"
    },
    {
        title: "@ldo/solid-react",
        href: "/ldo#solid-react",
        library: LIBRARY_LDO,
        slogan: "The creator behind LDO also offers a Solid/React integration",
        text: "@ldo/solid-react"
    },
    {
        title: "Inrupt JavaScript Client Libraries",
        href: "/inrupt#solid",
        library: LIBRARY_INRUPT,
        slogan: "Inrupt's JS libraries have been made with RDF and Solid in mind, and provide an extensive API to allow you to manage data",
        text: "Inrupt"
    },
    {
        title: "Soukai Solid",
        href: "/soukai#solid",
        icon: "/soukai-solid.svg",
        iconAlt: "Logo for Soukai Solid",
        library: LIBRARY_SOUKAI,
        slogan: "The creator of Soukai has also created a Solid engine that allows you to use Soukai with Solid",
        text: "Soukai Solid"
    },
    {
        title: "RDF-Ext",
        href: "/rdf-ext#solid",
        library: LIBRARY_RDF_EXT,
        slogan: "RDF-Ext also offers functionality to connect to online resources",
        text: "RDF-Ext"
    },
    {
        title: "Comunica",
        href: "/comunica#solid",
        library: LIBRARY_COMUNICA,
        slogan: "Comunica allows you to execute SPARQL queries for resources on the web",
        text: "Comunica"
    },
    {
        title: "m-ld",
        href: "/m-ld#solid",
        library: LIBRARY_M_LD,
        slogan: "Although Solid is not supported directly by m-ld, I've constructed a demo where I use both m-ld and LDO to synchronize the RDF graph between the P2P network (using m-ld) and Solid (using @ldo/solid-react)",
        text: "m-ld"
    },
    {
        title: "Quadstore",
        href: "/quadstore#solid",
        library: LIBRARY_QUADSTORE,
        slogan: "Solid is not supported directly by Quadstore, but it isn't to hard to integrate it into a Solid app. I've written a demo to show how this can be done by using N3.js to help with parsing.",
        text: "Quadstore"
    },
];

export const STORAGE_KEYS = {
    "PROFILE_GRAPOI": "profileGrapoi",
    "PROFILE_INRUPT": "profileInrupt",
    "PROFILE_LDKIT": "profileLDkit",
    "PROFILE_LDO": "profileLdo",
    "PROFILE_QUADSTORE": "profileQuadstore",
    "PROFILE_RDFLIB": "profileRdflib",
    "PROFILE_SOUKAI": "profileSoukai",
}

export type Unpromise<T extends Promise<unknown>> = T extends Promise<infer U> ? U : never;