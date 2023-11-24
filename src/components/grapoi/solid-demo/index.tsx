import {useEffect, useMemo, useState} from "react";
import grapoi from 'grapoi'
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import N3 from "n3";
import {PROFILE_URI} from "../../../constants.tsx";
import rdf from 'rdf-ext'
import {prefixes} from '@zazuko/rdf-vocabularies'

const foaf = rdf.namespace(prefixes.foaf);

export default function GrapoiSolidDemo() {
    const {session: {webId}, fetch} = useSolidAuth();
    const [dataset, setDataset] = useState<ReturnType<typeof rdf.dataset> | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const profile = useMemo(
        () => webId && dataset && grapoi({dataset, factory: rdf, term: rdf.namedNode(webId)}),
        [dataset, webId]
    );
    const name = useMemo(() => profile && profile.out(foaf.name).value, [profile])

    useEffect(() => {
        if (!webId) return;
        fetch(webId).then(async (response) => {
            const parser = new N3.Parser({baseIRI: PROFILE_URI, format: "text/turtle"});
            try {
                const turtle = await response.text();
                const quads = parser.parse(turtle);
                setDataset(rdf.dataset(quads, rdf.namedNode(webId)));
            } catch (error) {
                const message = error && typeof error === "string" ? error as string : "Error occurred while parsing";
                setError(new Error(message));
            }
        }).catch(setError);
    }, [fetch, webId]);

    if (!profile) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        if (!webId || !dataset) return;
        if (name) profile.deleteOut(foaf.name, [rdf.literal(name)]);
        profile.addOut(foaf.name, rdf.literal(data.name));
        for (const {subject, predicate, object, graph} of dataset) {
            console.log(predicate.value, object.value);
            if (!predicate.equals(foaf.name)) return;
            console.log(subject, predicate, object, graph);
        }
    };

    return <Demo error={error} name={name || "Not set"} onSubmit={onSubmit}/>
}