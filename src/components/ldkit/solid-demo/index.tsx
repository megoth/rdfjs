import {useSolidAuth} from "@ldo/solid-react";
import {useEffect, useState} from "react";
import {QueryEngine} from "@comunica/query-sparql";
import {createLens} from "ldkit";
import PersonSchema from "../Person.ts";
import Demo, {FormData} from "../../demo";

const engine = new QueryEngine();

export default function SoukaiSolidDemo() {
    const {session: {webId}, fetch} = useSolidAuth();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!webId) return;
        const Persons = createLens(PersonSchema, {
            source: webId,
            engine,
            fetch,
        })
        Persons.findByIri(webId).then((person) => {
            console.log("SOLID PERSON", person, webId);
        }).catch(setError);
    }, [fetch, webId]);

    // if (!person) {
    //     return <Loading/>
    // }

    const onSubmit = (data: FormData) => {
        setError(null);
        return new Promise((resolve) => resolve(data.name));
    };

    return <Demo error={error} name={"TBD"} onSubmit={onSubmit}/>
}