import {Fetcher, graph, lit, namedNode, st, UpdateManager} from "rdflib";
import {useEffect, useMemo, useState} from "react";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import {NAME_NODE} from "../../../constants.ts";
import ErrorMessage from "../../error-message";
import Loading from "../../loading";

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
            .then(() => setName(store.any(profileNode, NAME_NODE, null)?.value || ""))
            .catch(setError);
    }, [store, profileNode, fetcher]);

    const onSubmit = async (data: FormData) => {
        setError(null);
        const ins = [st(profileNode, NAME_NODE, lit(data.name), profileNode.doc())];
        const del = store.statementsMatching(profileNode, NAME_NODE, null, profileNode.doc());
        return new Promise((resolve) => updater.update(del, ins, (_uri, _success, errorBody, response) => {
            if (!_success) setError(new Error(errorBody));
            setName(data.name);
            resolve(response);
        }));
    };

    return error
        ? <ErrorMessage error={error}/>
        : name !== undefined
            ? <Demo name={name} onSubmit={onSubmit}/>
            : <Loading/>
}