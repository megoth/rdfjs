import {useEffect, useMemo, useState} from "react";
import Loading from "../../loading";
import Demo, {FormData} from "../../demo";
import ComunicaEngine from "@ldflex/comunica";
import {PathFactory} from "ldflex";
import {namedNode} from "@rdfjs/data-model";
import {useSolidAuth} from "@ldo/solid-react";
import {PROFILE_CONTEXT} from "../../../constants.tsx";

export default function LDflexSolidDemo() {
    const {session: {webId}} = useSolidAuth();
    const [error, setError] = useState<Error | null>(null);
    const queryEngine = useMemo(() => webId && new ComunicaEngine(webId), [webId]);
    const path = useMemo(() => queryEngine && new PathFactory({queryEngine}), [queryEngine]);
    const profile = useMemo(() => path && webId && path.create({
        context: PROFILE_CONTEXT,
        subject: namedNode(webId)
    }), [path, webId]);

    useEffect(() => {
        (async () => {
            if (!profile) return;
            console.log("PROFILE 2", await profile["foaf:name"]);
        })();
    }, [profile]);

    if (!profile && !error) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        console.log(data.name);
    };

    return <Demo error={error} name={"Not set"} onSubmit={onSubmit}/>
}