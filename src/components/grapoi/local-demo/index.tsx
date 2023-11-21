import {useEffect, useMemo, useState} from "react";
import grapoi from 'grapoi'
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import N3 from "n3";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants.tsx";
import rdf from 'rdf-ext'
import {literal, namedNode} from "@rdfjs/data-model";
import DatasetExt from "rdf-ext/lib/Dataset";
import namespace from '@rdfjs/namespace'
import {prefixes} from '@zazuko/rdf-vocabularies'
import useLocalStorage from "use-local-storage";

const foaf = namespace(prefixes.foaf);

export default function GrapoiLocalDemo() {
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_GRAPOI, PROFILE_TURTLE);
    const [dataset, setDataset] = useState<DatasetExt | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const profile = useMemo(
        () => dataset && grapoi({dataset, factory: rdf, term: namedNode(PROFILE_URI)}),
        [dataset]
    );
    const name = useMemo(() => profile && profile.out(foaf.name).value, [profile])

    useEffect(() => {
        const parser = new N3.Parser({baseIRI: PROFILE_URI, format: "text/turtle"});
        try {
            const parsed = parser.parse(turtle);
            setDataset(rdf.dataset(parsed, namedNode(PROFILE_URI)));
        } catch (error) {
            const message = error && typeof error === "string" ? error as string : "Error occurred while parsing";
            setError(new Error(message));
        }
    }, [turtle]);

    if (!profile) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        if (!dataset) return;
        profile.deleteOut(foaf.name, [literal(name)]);
        profile.addOut(foaf.name, data.name);
        const writer = new N3.Writer();
        for (const {subject, predicate, object, graph} of dataset) {
            writer.addQuad(subject, predicate, object, graph);
        }
        return new Promise((resolve) => writer.end((error, result) => {
            if (error) setError(error);
            setTurtle(result);
            resolve(result);
        }));
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}