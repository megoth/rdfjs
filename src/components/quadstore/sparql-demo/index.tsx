import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants";
import {useEffect, useMemo, useState} from "react";
import useLocalStorage from "use-local-storage";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {MemoryLevel} from 'memory-level';
import {Quadstore} from 'quadstore';
import {DataFactory, Parser, Writer} from "n3";
import {Engine} from 'quadstore-comunica';
import {extractError} from "../../../libs/error.ts";

export default function QuadstoreSPARQLDemo() {
    const backend = new MemoryLevel();
    const store = useMemo(() => new Quadstore({
        backend,
        dataFactory: DataFactory
    }), [backend]);
    const engine = new Engine(store);
    const [name, setName] = useState<string | undefined>();
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_QUADSTORE, PROFILE_TURTLE);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const parser = new Parser({baseIRI: PROFILE_URI, format: "text/turtle"});
        const quads = parser.parse(turtle);
        store.open().then(async () => {
            await store.multiPut(quads);
            const bindingsStream = await engine.queryBindings(`
                PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
                SELECT ?name WHERE {
                    <${PROFILE_URI}> foaf:name ?name .
                } LIMIT 1`);
            bindingsStream.on("data", (binding) => setName(binding.get("name").value));
        }).catch((error) => setError(extractError(error, "Error occurred while parsing")))
    }, [turtle]);

    if (name === undefined) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData): Promise<void> => {
        setError(null);
        const writer = new Writer();
        await engine.queryVoid(`
            PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
            DELETE { <${PROFILE_URI}> foaf:name "${name}" }
            INSERT { <${PROFILE_URI}> foaf:name "${data.name}" }
            WHERE { <${PROFILE_URI}> foaf:name "${name}" }
        `).catch(setError);
        await new Promise((resolve) => store.match()
            .on("error", setError)
            .on("data", (quad) => writer.addQuad(quad))
            .on("end", () => resolve(undefined)));
        await new Promise((resolve) => writer.end((error, result) => {
            if (error) throw extractError(error, "Error while serializing triples");
            setTurtle(result);
            resolve(result);
        })).catch(setError);
        setName(data.name);
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}