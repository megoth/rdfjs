import {useSolidAuth} from "@ldo/solid-react";
import {useEffect, useMemo, useState} from "react";
import {QueryEngine} from "@comunica/query-sparql";
import {createLens, type IQueryEngine} from "ldkit";
import {foaf} from "ldkit/namespaces";
import PersonSchema, {type Person} from "../Person.ts";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";

export default function LDkitSolidDemo() {
    const {session: {webId}, fetch} = useSolidAuth();
    const [person, setPerson] = useState<Person | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const engine = useMemo(() => new QueryEngine() as IQueryEngine, []);

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
    }, [fetch, webId, setPerson, setError, engine]);

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