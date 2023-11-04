import {graph, lit, parse, serialize, st} from "rdflib";
import {NAME_NODE, PROFILE_NODE, PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants.ts";
import {useEffect, useMemo, useState} from "react";
import useLocalStorage from "use-local-storage";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";

export default function RdflibLocalDemo() {
    const store = useMemo(() => graph(), []);
    const [name, setName] = useState<string | undefined>();
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_RDFLIB, PROFILE_TURTLE);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        parse(turtle, store, PROFILE_URI, "text/turtle", (error, updatedStore) => {
            if (error) setError(error);
            setName(updatedStore?.any(PROFILE_NODE, NAME_NODE, null)?.value || "");
        })
    }, [store, turtle]);


    const onSubmit = async (data: FormData): Promise<void> => {
        setError(null);
        store.remove(store.match(PROFILE_NODE, NAME_NODE, null));
        store.add(st(PROFILE_NODE, NAME_NODE, lit(data.name)));
        return new Promise((resolve) => serialize(null, store, null, 'text/turtle', (error, result) => {
            if (error) return setError(error);
            setTurtle(result);
            resolve();
        }));
    };

    return name === undefined ? <Loading/>
        : <Demo error={error} name={name} onSubmit={onSubmit}/>
}