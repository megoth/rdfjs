import Demo, {FormData} from "../../demo";
import {QueryEngine} from "@comunica/query-sparql";
import {useEffect, useMemo, useState} from "react";
import {useSolidAuth} from "@ldo/solid-react";

export default function ComunicaDemo() {
    const {fetch, session} = useSolidAuth();
    const engine = useMemo(() => new QueryEngine(), []);
    const [name, setName] = useState("");

    useEffect(() => {
        if (!session.isLoggedIn || !session.webId) return;

        engine.queryBindings(`
        PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
        SELECT ?s ?p ?name WHERE {
            <${session.webId}> foaf:name ?name.
            ?s ?p ?name
        } LIMIT 1`
            , {
                fetch,
                sources: [session.webId],
            }).then(async (stream) => {
            const bindings = await stream.toArray();
            const foundName = bindings[0].get("name")?.value || "Stranger";
            setName(foundName);
        })
    }, [engine, fetch, session.isLoggedIn, session.webId]);


    const onSubmit = async (data: FormData) => {
        if (!session.isLoggedIn || !session.webId) return;

        await engine.queryVoid(`
        PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
        DELETE { <${session.webId}> foaf:name "${name}" }
        INSERT { <${session.webId}> foaf:name "${data.name}" }
        WHERE { <${session.webId}> foaf:name "${name}" }
        `, {
            fetch,
            sources: [session.webId],
        })
        setName(data.name);
    };

    return <Demo name={name} onSubmit={onSubmit}/>
}