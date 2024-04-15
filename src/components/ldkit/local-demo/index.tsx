import {useEffect, useState} from "react";
import {N3} from "ldkit/rdf"
import {foaf} from "ldkit/namespaces";
import useLocalStorage from "use-local-storage";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants.tsx";
import {extractError} from "../../../libs/error.ts";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {QueryEngine} from "@comunica/query-sparql";
import {createLens} from "ldkit";
import PersonSchema from "../Person.ts";

const profile = new N3.NamedNode(PROFILE_URI);
const source = new N3.Store();

export default function SoukaiLocalDemo() {
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_LDKIT, PROFILE_TURTLE);
    const [error, setError] = useState<Error | null>(null);
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        try {
            const parser = new N3.Parser({baseIRI: PROFILE_URI, format: "text/turtle"});
            source.addQuads(parser.parse(turtle));

            const engine = new QueryEngine();
            const Persons = createLens(PersonSchema, {
                source,
                engine
            })

            Persons.findByIri(PROFILE_URI).then((person) => {
                console.log("PERSON", person);
            })
            // engine.queryBindings(`
            // PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
            // SELECT ?name WHERE {
            //     <${PROFILE_URI}> foaf:name ?name .
            // } LIMIT 1`).then(async (stream) => {
            //     console.log("STREAM", stream);
            // })
            // setName(source.getObjects(profile, foaf.name, null)[0]?.value || null);
        } catch (error) {
            setError(extractError(error, "Error occurred while parsing"));
        }
    }, [profile, turtle]);

    if (!name) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        console.log("PARTS", profile, new N3.NamedNode(foaf.name));
        source.removeMatches(profile, new N3.NamedNode(foaf.name));
        source.addQuad(new N3.Quad(profile, new N3.NamedNode(foaf.name), new N3.Literal(data.name)));

        const writer = new N3.Writer();
        writer.addQuads(source.getQuads(null, null, null, null));
        return new Promise((resolve) => writer.end((error, result) => {
            if (error) setError(error);
            // setTurtle(result);
            console.log("TURTLE", result);
            resolve(result);
        }));
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}