import {useEffect, useMemo, useState} from "react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {MemoryLevel} from 'memory-level';
import {DataFactory} from 'rdf-data-factory';
import {Quadstore} from 'quadstore';
import N3 from "n3";
import {extractError} from "../../../libs/error.ts";
import {useSolidAuth} from "@ldo/solid-react";
import {FOAF} from "../../../namespaces.ts";

const backend = new MemoryLevel();
const df = new DataFactory();

export default function QuadstoreSolidDemo() {
    const {session: {webId}, fetch} = useSolidAuth();
    const store = useMemo(() => new Quadstore({
        backend,
        dataFactory: df
    }), [backend, df]);
    const [name, setName] = useState<string | undefined>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const parser = new N3.Parser({baseIRI: webId, format: "text/turtle"});
        if (!webId) {
            return;
        }
        try {
            fetch(webId, {
                method: "GET",
                headers: {"Content-Type": "text/turtle"},
            }).then(async (response) => {
                const turtle = await response.text();
                const quads = parser.parse(turtle);
                await store.open()
                await Promise.all(quads.map(async ({subject, predicate, object, graph}) => {
                    await store.put(df.quad(subject, predicate, object, graph));
                }));
                const quadsStream = store.match(df.namedNode(webId), FOAF.name);
                quadsStream.on('data', quad => setName(quad.object.value));
            })
        } catch (error) {
            setError(extractError(error, "Error occurred while parsing"));
        }
    }, [fetch, webId]);

    if (name === undefined) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData): Promise<void> => {
        setError(null);
        if (!webId) return;
        await Promise.all([
            store.multiPatch(
                [df.quad(df.namedNode(webId), FOAF.name, df.literal(name))],
                [df.quad(df.namedNode(webId), FOAF.name, df.literal(data.name))]
            ),
            fetch(webId, {
                method: "PATCH",
                headers: {"Content-Type": "application/sparql-update"},
                body: `
DELETE DATA { <${webId}> <${FOAF.name.value}> "${name}" . }
INSERT DATA { <${webId}> <${FOAF.name.value}> "${data.name}" . }`
            })
        ]).catch(setError)
        setName(data.name);
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}