import {useSolidAuth} from "@ldo/solid-react";
import {useEffect, useState} from "react";
import {QueryEngine} from "@comunica/query-sparql";
import {createLens} from "ldkit";
import PersonSchema, {type Person} from "../Person.ts";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";

const engine = new QueryEngine();

export default function LDkitSolidDemo() {
    const {session: {webId}, fetch} = useSolidAuth();
    const [error, setError] = useState<Error | null>(null);
    const [person, setPerson] = useState<Person | null>(null);

    useEffect(() => {
        const load = async () => {
            if (!webId) return;
            const Persons = createLens(PersonSchema, {
                source: webId,
                engine,
                fetch,
                logQuery: console.log, // All SPARQL queries will be logged to the console
            })

            // const person = await Persons.findByIri(webId); // This does not work for some reason, possibly because of bug in Comunica
            const person = await Persons.findOne();
            console.log("SOLID PERSON", person);
            setPerson(person);
        }

        load().catch(setError);
    }, [fetch, webId, setPerson, setError]);

    if (!person) {
        return <Loading/>
    }

    const onSubmit = (data: FormData) => {
        setError(null);
        return new Promise((resolve) => resolve(data.name));
    };

    return <Demo error={error} name={person.name} onSubmit={onSubmit}/>
}