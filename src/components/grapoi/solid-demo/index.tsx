import {useEffect, useState} from "react";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import rdf from 'rdf-ext'
import {FOAF} from "../../../namespaces.ts";

export default function GrapoiSolidDemo() {
    const {session: {webId}, fetch} = useSolidAuth();
    const [error, setError] = useState<Error | null>(null);
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        if (!webId) return;
        rdf.io.dataset.fromURL(webId).then((dataset) => {
            if (!dataset) return;
            const profile = rdf.grapoi({dataset, term: rdf.namedNode(webId)});
            setName(profile.out(FOAF.name).value);
        })
    }, [webId]);

    if (!name) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        if (!webId) return;
        await fetch(webId, {
            method: "PATCH",
            headers: {"Content-Type": "application/sparql-update"},
            body: `
DELETE DATA { <${webId}> <${FOAF.name.value}> "${name}" . }
INSERT DATA { <${webId}> <${FOAF.name.value}> "${data.name}" . }`
        });
        setName(data.name);
    };

    return <Demo error={error} name={name || "Not set"} onSubmit={onSubmit}/>
}