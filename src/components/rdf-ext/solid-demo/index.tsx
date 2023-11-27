import {useEffect, useState} from "react";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import rdf from 'rdf-ext'

const ns = {foaf: rdf.namespace("http://xmlns.com/foaf/0.1/")};

export default function GrapoiSolidDemo() {
    const {session: {webId}, fetch} = useSolidAuth();
    const [name, setName] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!webId) return;
        rdf.io.dataset.fromURL(webId).then((dataset) => {
            if (!dataset) return;
            const profile = rdf.grapoi({dataset, term: rdf.namedNode(webId)});
            setName(profile.out(ns.foaf.name).value || "");
        }).catch(setError);
    }, [webId]);

    if (name === null) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        if (!webId) return;
        await fetch(webId, {
            method: "PATCH",
            headers: {"Content-Type": "application/sparql-update"},
            body: `
DELETE DATA { <${webId}> <${ns.foaf.name}> "${name}" . }
INSERT DATA { <${webId}> <${ns.foaf.name}> "${data.name}" . }`
        }).catch(setError);
        setName(data.name);
    };

    return <Demo error={error} name={name || ""} onSubmit={onSubmit}/>
}