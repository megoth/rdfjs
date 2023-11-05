import {lit, namedNode, st} from "rdflib";
import {HTMLAttributes, useCallback, useEffect, useState} from "react";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import {NAME_NODE} from "../../../constants.ts";
import Loading from "../../loading";
import useStore from "../store-hook.ts";

export default function RdflibDownstreamDemo({ id }: HTMLAttributes<HTMLDivElement>) {
    const {session: {webId}} = useSolidAuth();
    const store = useStore();
    const [name, setName] = useState<string | undefined>();
    const profileNode = namedNode(webId!);
    const [error, setError] = useState<Error | null>(null);

    const getName = useCallback(() => {
        return store.any(profileNode, NAME_NODE, null)?.value ?? "";
    }, [profileNode, store]);

    useEffect(() => {
        store.fetcher.load(profileNode.doc())
            .then(() => setName(getName()))
            .catch(setError);
    }, [store, profileNode, store.fetcher, getName]);

    useEffect(() => {
        store.updater.addDownstreamChangeListener(profileNode.doc(), () => {
            console.log("id", id, getName());
        });
    }, [getName, id, name, profileNode, store.updater]);

    const onSubmit = async (data: FormData) => {
        setError(null);
        const ins = [st(profileNode, NAME_NODE, lit(data.name), profileNode.doc())];
        const del = store.statementsMatching(profileNode, NAME_NODE, null, profileNode.doc());
        return (store.updater.update(del, ins) as Promise<void>).then(() => setName(data.name)).catch(setError);
    };

    return name !== undefined
        ? <Demo error={error} name={name} onSubmit={onSubmit}/>
        : <Loading/>
}