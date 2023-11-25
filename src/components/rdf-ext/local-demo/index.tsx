import {useEffect, useMemo, useState} from "react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants.tsx";
import rdf from 'rdf-ext'
import useLocalStorage from "use-local-storage";

const ns = {foaf: rdf.namespace("http://xmlns.com/foaf/0.1/")};

export default function GrapoiLocalDemo() {
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_GRAPOI, PROFILE_TURTLE);
    const [error, setError] = useState<Error | null>(null);
    const [profile, setProfile] = useState<rdf.Grapoi | null>(null);
    const name = useMemo(() => profile && profile.out(ns.foaf.name).value, [profile])

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
        if (name) profile.deleteOut(ns.foaf.name, [name]);
        profile.addOut(ns.foaf.name, data.name);
        setTurtle(await rdf.io.dataset.toText('text/turtle', profile.dataset));
    };

    return <Demo error={error} name={name || "Not set"} onSubmit={onSubmit}/>
}