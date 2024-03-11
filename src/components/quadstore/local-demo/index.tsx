import {PROFILE_URI, STORAGE_KEYS} from "../../../constants";
import {useEffect, useMemo, useState} from "react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {BrowserLevel} from 'browser-level';
import {Quadstore} from 'quadstore';
import {DataFactory} from "n3";
import {FOAF} from "../../../namespaces.ts";

export default function QuadstoreLocalDemo() {
    const backend = new BrowserLevel(STORAGE_KEYS.PROFILE_QUADSTORE);
    const store = useMemo(() => new Quadstore({
        backend,
        dataFactory: DataFactory
    }), [backend]);
    const [name, setName] = useState<string | undefined>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        store.open().then(async () => {
            const {items} = await store.get({
                subject: DataFactory.namedNode(PROFILE_URI),
                predicate: FOAF.name
            });
            setName(items[0].object.value || "Test");
        }).catch(setError)
    }, []);

    if (name === undefined) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        await store.multiPatch(
            [DataFactory.quad(DataFactory.namedNode(PROFILE_URI), FOAF.name, DataFactory.literal(name))],
            [DataFactory.quad(DataFactory.namedNode(PROFILE_URI), FOAF.name, DataFactory.literal(data.name))]
        ).catch(setError);
        setName(data.name);
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}