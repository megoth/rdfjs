import {type SchemaInterface} from "ldkit";
import {foaf} from "ldkit/namespaces";

const PersonSchema = {
    "@type": foaf.Person,
    name: foaf.name,
} as const;

export type Person = SchemaInterface<typeof PersonSchema>;

export default PersonSchema;
