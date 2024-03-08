import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants";
import {useEffect, useMemo, useState} from "react";
import useLocalStorage from "use-local-storage";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {MemoryLevel} from 'memory-level';
import {Quadstore} from 'quadstore';
import {DataFactory, Parser, Writer} from "n3";
import {extractError} from "../../../libs/error.ts";
import {FOAF} from "../../../namespaces.ts";

export default function QuadstoreLocalDemo() {
    const backend = new MemoryLevel();
    const store = useMemo(() => new Quadstore({
        backend,
        dataFactory: DataFactory
    }), [backend]);
    const [name, setName] = useState<string | undefined>();
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_QUADSTORE, PROFILE_TURTLE);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const parser = new Parser({baseIRI: PROFILE_URI, format: "text/turtle"});
        const quads = parser.parse(turtle);
        store.open().then(async () => {
            await store.multiPut(quads);
            const quadsStream = store.match(DataFactory.namedNode(PROFILE_URI), FOAF.name);
            quadsStream.on('data', quad => setName(quad.object.value));
        }).catch((error) => setError(extractError(error, "Error occurred while parsing")))
    }, [turtle]);

    if (name === undefined) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        await store.multiPatch(
            [DataFactory.quad(DataFactory.namedNode(PROFILE_URI), FOAF.name, DataFactory.literal(name))],
            [DataFactory.quad(DataFactory.namedNode(PROFILE_URI), FOAF.name, DataFactory.literal(data.name))]
        )
            .then(() => setName(data.name))
            .catch(setError);
        const writer = new Writer();
        await new Promise((resolve) => store.match() // get all quads
            .on("error", setError)
            .on("data", (quad) => writer.addQuad(quad))
            .on("end", () => resolve(null)));
        return new Promise((resolve) => writer.end((error, result) => {
            if (error) throw extractError(error, "Error while serializing triples");
            setTurtle(result);
            resolve(result);
        })).catch(setError);
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}