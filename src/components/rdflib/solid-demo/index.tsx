import * as $rdf from "rdflib";
import {Fetcher, graph, lit, namedNode, st, UpdateManager} from "rdflib";
import {useEffect, useMemo, useState} from "react";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import solidNamespace from "solid-namespace";

const ns = solidNamespace($rdf);

export default function RdflibSolidDemo() {
    const {session: {webId}, fetch} = useSolidAuth();
    const [store, fetcher, updater] = useMemo(() => {
        const store = graph();
        return [store, new Fetcher(store, {fetch}), new UpdateManager(store)];
    }, [fetch]);
    const [name, setName] = useState<string | undefined>();
    const profileNode = namedNode(webId!);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetcher.load(profileNode.doc())
            .then(() => setName(store.any(profileNode, ns.foaf("name"), null)?.value ?? ""))
            .catch(setError);
    }, [store, profileNode, fetcher]);

    if (name === undefined) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        const ins = [st(profileNode, ns.foaf("name"), lit(data.name), profileNode.doc())];
        const del = store.statementsMatching(profileNode, ns.foaf("name"), null, profileNode.doc());
        return new Promise((resolve) => updater.update(del, ins, (_uri, _success, errorBody, response) => {
            if (!_success) setError(new Error(errorBody));
            setName(data.name);
            resolve(response);
        }));
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}