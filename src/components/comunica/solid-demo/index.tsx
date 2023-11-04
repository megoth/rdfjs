import Demo, {FormData} from "../../demo";
import {QueryEngine} from "@comunica/query-sparql";
import {useEffect, useState} from "react";
import {useSolidAuth} from "@ldo/solid-react";
import Loading from "../../loading";

const engine = new QueryEngine();

export default function ComunicaDemo() {
    const {fetch, session: {webId}} = useSolidAuth();
    const [name, setName] = useState<string | undefined>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!webId) return;
        engine.queryBindings(`
        PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
        SELECT ?name WHERE {
            <${webId}> foaf:name ?name .
        } LIMIT 1`, {
            fetch,
            sources: [webId],
        }).then(async (stream) => {
            const [bindings] = await stream.toArray();
            const foundName = bindings?.get("name")?.value ?? "";
            setName(foundName);
        }).catch(setError);
    }, [fetch, webId]);

    if (name === undefined) return <Loading />

    const onSubmit = async (data: FormData) => {
        setError(null);
        if (!webId) return;
        await engine.queryVoid(`
        PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
        DELETE { <${webId}> foaf:name "${name}" }
        INSERT { <${webId}> foaf:name "${data.name}" }
        WHERE { <${webId}> foaf:name "${name}" }
        `, {
            fetch,
            sources: [webId],
        }).catch(setError);
        setName(data.name);
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}