import Demo, {FormData} from "../demo";
import {QueryEngine} from "@comunica/query-sparql";
import {useEffect, useState} from "react";
import {useSolidAuth} from "@ldo/solid-react";
import Loading from "../loading";
import {literal, namedNode} from '@rdfjs/data-model'
import {DELETE, SELECT} from '@tpluscode/sparql-builder'
import {FOAF} from "../../namespaces.ts";

const engine = new QueryEngine();

export default function SparqlBuilderDemo() {
    const {fetch, session: {webId}} = useSolidAuth();
    const [name, setName] = useState<string | undefined>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!webId) return;
        const query = SELECT`?name`
            .WHERE`${namedNode(webId)} ${FOAF.name} ?name .`
            .LIMIT(1)
            .build();
        engine.queryBindings(query, {
            fetch,
            sources: [webId],
        }).then(async (stream) => {
            const [bindings] = await stream.toArray();
            const foundName = bindings?.get("name")?.value ?? "";
            setName(foundName);
        }).catch(setError);
    }, [fetch, webId]);

    if (name === undefined) return <Loading/>

    const onSubmit = async (data: FormData) => {
        setError(null);
        if (!webId) return;
        const query = DELETE`${(namedNode(webId))} ${FOAF.name} ${(literal(name))}`
            .INSERT`${(namedNode(webId))} ${FOAF.name} ${literal(data.name)}`
            .WHERE`${(namedNode(webId))} ${FOAF.name} ${(literal(name))}`
            .build();
        await engine.queryVoid(query, {
            fetch,
            sources: [webId],
        }).catch(setError);
        setName(data.name);
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}