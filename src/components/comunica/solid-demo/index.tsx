import Demo, {FormData} from "../../demo";
import {QueryEngine} from "@comunica/query-sparql";
import {useEffect, useState} from "react";
import {useSolidAuth} from "@ldo/solid-react";
import Loading from "../../loading";

const engine = new QueryEngine();

export default function ComunicaDemo() {
    const {fetch, session} = useSolidAuth();
    const [name, setName] = useState<string | undefined>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!session.webId) return;
        engine.queryBindings(`
        PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
        SELECT ?name WHERE {
            <${session.webId}> foaf:name ?name
        } LIMIT 1`, {
            fetch,
            sources: [session.webId],
        }).then(async (stream) => {
            const bindings = await stream.toArray();
            const foundName = bindings[0].get("name")?.value ?? "";
            setName(foundName);
        }).catch(setError);
    }, [fetch, session.webId]);

    if (name === undefined) return <Loading />

    const onSubmit = async (data: FormData) => {
        setError(null);
        if (!session.webId) return;
        await engine.queryVoid(`
        PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
        DELETE { <${session.webId}> foaf:name "${name}" }
        INSERT { <${session.webId}> foaf:name "${data.name}" }
        WHERE { <${session.webId}> foaf:name "${name}" }
        `, {
            fetch,
            sources: [session.webId],
        }).catch(setError);
        setName(data.name);
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}