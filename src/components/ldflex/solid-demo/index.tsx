import context from "../context.json";
import ComunicaEngine from "@ldflex/comunica";
import {PathFactory} from "ldflex";
import {useEffect, useState} from "react";
import {useSolidAuth} from "@ldo/solid-react";
import {literal, namedNode} from "@rdfjs/data-model";
import Loading from "../../loading";
import Demo, {FormData} from "../../demo";

export default function LDflexSolidDemo() {
    const {session: {webId}} = useSolidAuth();
    const [profile, setProfile] = useState<any>(null);
    const [name, setName] = useState("");
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!webId) return;
        (async () => {
            const queryEngine = new ComunicaEngine(webId.split("#")[0]);
            const path = new PathFactory({ context, queryEngine });
            const profile = path.create({ subject: namedNode(webId)});
            setProfile(profile);
            setName(await profile.name.value);
        })()
    }, [webId]);

    if (!name) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        if (!profile) return;
        setError(null);
        await profile.name.set(literal(data.name));
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}