import {foaf, rdfs} from "ldkit/namespaces";

const PersonSchema = {
    "@type": foaf.Person,
    name: rdfs.label,
} as const;

export default PersonSchema;
