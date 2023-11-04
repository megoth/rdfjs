import Demo, {FormData} from "../demo";
import {QueryEngine} from "@comunica/query-sparql";
import {useEffect, useState} from "react";
import {useSolidAuth} from "@ldo/solid-react";
import Loading from "../loading";
import {literal, namedNode} from '@rdfjs/data-model'
import {DELETE, SELECT} from '@tpluscode/sparql-builder'
import namespace from '@rdfjs/namespace'
import {prefixes} from '@zazuko/rdf-vocabularies'

const engine = new QueryEngine();
const foaf = namespace(prefixes.foaf)

export default function SparqlBuilderDemo() {
    const {fetch, session: {webId}} = useSolidAuth();
    const [name, setName] = useState<string | undefined>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!webId) return;
        const query = SELECT`?name`
            .WHERE`${namedNode(webId)} ${foaf.name} ?name .`
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
        const webIdNode = namedNode(webId);
        const name = foaf.name;
        const oldName = literal(name);
        const query = DELETE`${webIdNode} ${name} ${oldName}`
            .INSERT`${webIdNode} ${name} ${literal(data.name)}`
            .WHERE`${webIdNode} ${name} ${oldName}`
            .build();
        await engine.queryVoid(query, {
            fetch,
            sources: [webId],
        }).catch(setError);
        setName(data.name);
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}