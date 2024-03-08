import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants";
import {useEffect, useMemo, useState} from "react";
import useLocalStorage from "use-local-storage";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {MemoryLevel} from 'memory-level';
import {DataFactory} from 'rdf-data-factory';
import {Quadstore} from 'quadstore';
import N3 from "n3";
import {extractError} from "../../../libs/error.ts";
import {FOAF} from "../../../namespaces.ts";

const backend = new MemoryLevel();
const df = new DataFactory();

export default function QuadstoreLocalDemo() {
    const store = useMemo(() => new Quadstore({
        backend,
        dataFactory: df
    }), [backend, df]);
    const [name, setName] = useState<string | undefined>();
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_QUADSTORE, PROFILE_TURTLE);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const parser = new N3.Parser({baseIRI: PROFILE_URI, format: "text/turtle"});
        const quads = parser.parse(turtle);
        store.open().then(async () => {
            await Promise.all(quads.map(async ({subject, predicate, object, graph}) => {
                await store.put(df.quad(subject, predicate, object, graph));
            }));
            const quadsStream = store.match(df.namedNode(PROFILE_URI), FOAF.name);
            quadsStream.on('data', quad => setName(quad.object.value));
        }).catch((error) => setError(extractError(error, "Error occurred while parsing")))
    }, [turtle]);

    if (name === undefined) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        await store.multiPatch(
            [df.quad(df.namedNode(PROFILE_URI), FOAF.name, df.literal(name))],
            [df.quad(df.namedNode(PROFILE_URI), FOAF.name, df.literal(data.name))]
        )
            .then(() => setName(data.name))
            .catch(setError);
        const writer = new N3.Writer();
        await new Promise((resolve) => store.match()
            .on("error", setError)
            .on("data", ({subject, predicate, object, graph}) => {
                writer.addQuad(subject, predicate, object, graph);
            })
            .on("end", () => resolve(undefined)));
        return new Promise((resolve) => writer.end((error, result) => {
            if (error) throw extractError(error, "Error while serializing triples");
            setTurtle(result);
            resolve(result);
        })).catch(setError);
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}