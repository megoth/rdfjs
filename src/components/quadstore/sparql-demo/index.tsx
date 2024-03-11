import {PROFILE_URI, STORAGE_KEYS} from "../../../constants";
import {useEffect, useMemo, useState} from "react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {BrowserLevel} from 'browser-level';
import {Quadstore} from 'quadstore';
import {DataFactory} from "n3";
import {Engine} from 'quadstore-comunica';

export default function QuadstoreSPARQLDemo() {
    const backend = new BrowserLevel(STORAGE_KEYS.PROFILE_QUADSTORE);
    const store = useMemo(() => new Quadstore({
        backend,
        dataFactory: DataFactory
    }), [backend]);
    const engine = new Engine(store);
    const [name, setName] = useState<string | undefined>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        store.open().then(async () => {
            const bindingsStream = await engine.queryBindings(`
                PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
                SELECT ?name WHERE {
                    <${PROFILE_URI}> foaf:name ?name .
                } LIMIT 1`);
            bindingsStream.on("data", (binding) => setName(binding.get("name").value || "Test"));
        }).catch(setError);
    }, []);

    if (name === undefined) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData): Promise<void> => {
        setError(null);
        await engine.queryVoid(`
            PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
            DELETE { <${PROFILE_URI}> foaf:name "${name}" }
            INSERT { <${PROFILE_URI}> foaf:name "${data.name}" }
            WHERE { <${PROFILE_URI}> foaf:name "${name}" }
        `).catch(setError);
        setName(data.name);
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}