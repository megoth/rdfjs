import {useEffect, useState} from "react";
import {N3} from "ldkit/rdf"
import useLocalStorage from "use-local-storage";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants.tsx";
import {extractError} from "../../../libs/error.ts";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {QueryEngine} from "@comunica/query-sparql";
import {createLens} from "ldkit";
import PersonSchema, {type Person} from "../Person.ts";

const parser = new N3.Parser({baseIRI: PROFILE_URI, format: "text/turtle"});
const source = new N3.Store();
const engine = new QueryEngine();
const Persons = createLens(PersonSchema, {
    source,
    engine,
    logQuery: console.log, // All SPARQL queries will be logged to the console
});

async function emptyStore(store: N3.Store) {
    const stream = store.removeMatches(null, null, null, null);
    return new Promise((resolve) => {
        stream.on("end", resolve);
    });
}

export default function LDkitLocalDemo() {
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_LDKIT, PROFILE_TURTLE);
    const [error, setError] = useState<Error | null>(null);
    const [person, setPerson] = useState<Person | null>(null);

    useEffect(() => {
        // run the update when the turtle content changes
        const update = async () => {
            await emptyStore(source); // remove all contents of the data source
            source.addQuads(parser.parse(turtle)); // add new contents to the data source

            const person = await Persons.findByIri(PROFILE_URI); // load the profile
            console.log("PERSON", person);
            setPerson(person);
        };

        update().catch((error) => setError(extractError(error, "Error occurred while updating")));
    }, [turtle, setPerson, setError]);

    if (!person) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);

        console.log("DATA", data);

        await Persons.update({
            $id: PROFILE_URI,
            name: data.name
        });

        const verify = await Persons.findByIri(PROFILE_URI)
        if (verify === null) {
            // Workaround for bug in Comunica: https://github.com/comunica/comunica/issues/1301
            await Persons.insert({
                $id: PROFILE_URI,
                name: data.name
            });
        }

        const writer = new N3.Writer();
        writer.addQuads(source.getQuads(null, null, null, null));
        return new Promise((resolve) => writer.end((error, result) => {
            if (error) setError(error);
            setTurtle(result);
            console.log("TURTLE", result);
            resolve(result);
        }));
    };

    return <Demo error={error} name={person.name} onSubmit={onSubmit}/>
}