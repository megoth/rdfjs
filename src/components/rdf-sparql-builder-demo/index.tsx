import Demo, {FormData} from "../demo";
import {QueryEngine} from "@comunica/query-sparql";
import {useEffect, useState} from "react";
import {useSolidAuth} from "@ldo/solid-react";
import Loading from "../loading";
import {literal, namedNode, variable} from '@rdfjs/data-model'
import namespace from '@rdfjs/namespace'
import {prefixes} from '@zazuko/rdf-vocabularies'
import * as sparql from "rdf-sparql-builder";

const engine = new QueryEngine();
const foaf = namespace(prefixes.foaf)

export default function RDFSparqlBuilderDemo() {
    const {fetch, session: {webId}} = useSolidAuth();
    const [name, setName] = useState<string | undefined>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!webId) return;
        const query = sparql.select([variable('name')])
            .where([[namedNode(webId), foaf.name, variable("name")]])
            .limit(1)
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
        const query = sparql.deleteQuery([[namedNode(webId), foaf.name, literal(name)]])
            .insert([[namedNode(webId), foaf.name, literal(data.name)]])
            .where([[namedNode(webId), foaf.name, literal(name)]])
            .build();
        await engine.queryVoid(query, {
            fetch,
            sources: [webId],
        }).catch(setError);
        setName(data.name);
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}