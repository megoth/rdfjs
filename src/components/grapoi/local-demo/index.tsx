import {useEffect, useMemo, useState} from "react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants.tsx";
import rdf from 'rdf-ext'
import {prefixes} from '@zazuko/rdf-vocabularies'
import useLocalStorage from "use-local-storage";

const foaf = rdf.namespace(prefixes.foaf);

export default function GrapoiLocalDemo() {
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_GRAPOI, PROFILE_TURTLE);
    const [error, setError] = useState<Error | null>(null);
    const [profile, setProfile] = useState<ReturnType<typeof rdf.grapoi>>(null);
    const name = useMemo(() => profile && profile.out(foaf.name).value, [profile])

    useEffect(() => {
        rdf.io.dataset.fromText('text/turtle', turtle, {bareIRI: PROFILE_URI}).then((dataset) => {
            if (!dataset) return;
            setProfile(rdf.grapoi({dataset, term: rdf.namedNode(PROFILE_URI)}))
        })
    }, [turtle]);

    if (!profile) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        if (name) profile.deleteOut(foaf.name, [rdf.literal(name)]);
        profile.addOut(foaf.name, rdf.literal(data.name));
        setTurtle(await rdf.io.dataset.toText('text/turtle', profile.dataset));
    };

    return <Demo error={error} name={name || "Not set"} onSubmit={onSubmit}/>
}