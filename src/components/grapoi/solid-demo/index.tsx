import {useEffect, useMemo, useState} from "react";
import grapoi from 'grapoi'
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import N3 from "n3";
import {PROFILE_URI} from "../../../constants.tsx";
import rdf from 'rdf-ext'
import {literal, namedNode} from "@rdfjs/data-model";
import DatasetExt from "rdf-ext/lib/Dataset";
import namespace from '@rdfjs/namespace'
import {prefixes} from '@zazuko/rdf-vocabularies'

const foaf = namespace(prefixes.foaf);

export default function InruptSolidDemo() {
    const {session: {webId}, fetch} = useSolidAuth();
    const [dataset, setDataset] = useState<DatasetExt | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const profile = useMemo(
        () => webId && dataset && grapoi({dataset, term: namedNode(webId)}),
        [dataset, webId]
    );
    const name = useMemo(() => profile && profile.out(foaf.name).value, [profile])

    useEffect(() => {
        if (!webId) return;
        fetch(webId).then(async (response) => {
            const parser = new N3.Parser({baseIRI: PROFILE_URI, format: "text/turtle"});
            try {
                const turtle = await response.text();
                const parsed = parser.parse(turtle);
                setDataset(rdf.dataset(parsed, namedNode(webId)));
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
        profile.deleteOut(foaf.name, [literal(name)]);
        profile.addOut(foaf.name, data.name);
        return new Promise((resolve) => resolve(null));
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}