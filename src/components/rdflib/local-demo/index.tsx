import {graph, lit, namedNode, parse, serialize, st} from "rdflib";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants";
import {useEffect, useMemo, useState} from "react";
import useLocalStorage from "use-local-storage";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {FOAF} from "../../../namespaces.ts";

export default function RdflibLocalDemo() {
    const store = useMemo(() => graph(), []);
    const [name, setName] = useState<string | undefined>();
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_RDFLIB, PROFILE_TURTLE);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        parse(turtle, store, PROFILE_URI, "text/turtle", (error, updatedStore) => {
            if (error) setError(error);
            setName(updatedStore?.any(namedNode(PROFILE_URI), namedNode(FOAF.name.value), null)?.value || "");
        })
    }, [store, turtle]);

    if (name === undefined) {
        return <Loading />
    }

    const onSubmit = async (data: FormData): Promise<void> => {
        setError(null);
        store.remove(store.match(namedNode(PROFILE_URI), namedNode(FOAF.name.value), null));
        store.add(st(namedNode(PROFILE_URI), namedNode(FOAF.name.value), lit(data.name)));
        return new Promise((resolve) => serialize(null, store, null, 'text/turtle', (error, result) => {
            if (error) return setError(error);
            setTurtle(result);
            resolve();
        }));
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}