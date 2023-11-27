import {graph, lit, namedNode, parse, serialize, st} from "rdflib";
import * as $rdf from "rdflib";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants";
import {useEffect, useMemo, useState} from "react";
import useLocalStorage from "use-local-storage";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import solidNamespace from "solid-namespace";

const ns = solidNamespace($rdf);

export default function RdflibLocalDemo() {
    const store = useMemo(() => graph(), []);
    const [name, setName] = useState<string | undefined>();
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_RDFLIB, PROFILE_TURTLE);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        parse(turtle, store, PROFILE_URI, "text/turtle", (error, updatedStore) => {
            if (error) setError(error);
            setName(updatedStore?.any(namedNode(PROFILE_URI), ns.foaf("name"), null)?.value || "");
        })
    }, [store, turtle]);

    if (name === undefined) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData): Promise<void> => {
        setError(null);
        store.remove(store.match(namedNode(PROFILE_URI), ns.foaf("name"), null));
        store.add(st(namedNode(PROFILE_URI), ns.foaf("name"), lit(data.name)));
        return new Promise((resolve) => serialize(null, store, null, 'text/turtle', (error, result) => {
            if (error) return setError(error);
            setTurtle(result);
            resolve();
        }));
    };

    return <Demo id="LocalDemo" error={error} name={name} onSubmit={onSubmit}/>
}