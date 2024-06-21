import {useSolidAuth} from "@ldo/solid-react";
import {useEffect, useState} from "react";
import {QueryEngine} from "@comunica/query-sparql";
import {createLens, createNamespace} from "ldkit";
import PersonSchema, {type Person} from "../Person.ts";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";

const engine = new QueryEngine();
const foaf = createNamespace({
    iri: "http://xmlns.com/foaf/0.1/",
    prefix: "foaf:",
    terms: ["name"],
} as const);

export default function LDkitSolidDemo() {
    const {session: {webId}, fetch} = useSolidAuth();
    const [error, setError] = useState<Error | null>(null);
    const [person, setPerson] = useState<Person | null>(null);

    useEffect(() => {
        (async () => {
            if (!webId) return;
            const Persons = createLens(PersonSchema, {
                source: webId,
                engine,
                fetch,
                logQuery: console.log, // All SPARQL queries will be logged to the console
            })
            setPerson(await Persons.findByIri(webId));
        })().catch(setError);
    }, [fetch, webId, setPerson, setError]);

    if (!person) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        if (!webId) return;
        await fetch(webId, {
            method: "PATCH",
            headers: {"Content-Type": "application/sparql-update"},
            body: `
DELETE DATA { <${webId}> <${foaf.name}> "${person.name}" . }
INSERT DATA { <${webId}> <${foaf.name}> "${data.name}" . }`
        }).catch(setError);
        person.name = data.name;
    };

    return <Demo error={error} name={person.name} onSubmit={onSubmit}/>
}