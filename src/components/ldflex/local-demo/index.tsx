import {useEffect, useMemo, useState} from "react";
import Loading from "../../loading";
import useLocalStorage from "use-local-storage";
import {PROFILE_CONTEXT, PROFILE_JSON, PROFILE_URI, STORAGE_KEYS} from "../../../constants";
import Demo, {FormData} from "../../demo";
import ComunicaEngine from "@ldflex/comunica";
import {PathFactory} from "ldflex";
import {namedNode} from "@rdfjs/data-model";

export default function LDflexLocalDemo() {
    const [json, setJSON] = useLocalStorage(STORAGE_KEYS.PROFILE_LDFLEX, PROFILE_JSON);
    const [error, setError] = useState<Error | null>(null);

    const queryEngine = useMemo(() => new ComunicaEngine(PROFILE_URI), []);
    const path = useMemo(() => new PathFactory({queryEngine}, json), [json, queryEngine]);
    const profile = useMemo(() => path.create({
        context: PROFILE_CONTEXT,
        subject: namedNode(PROFILE_URI),
    }), [path]);

    useEffect(() => {
        (async () => {
            console.log("PROFILE", await profile?.name);
        })();
    }, [profile]);

    if (!error) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        console.log(data.name);
    };

    return <Demo error={error} name={"Not set"} onSubmit={onSubmit}/>
}