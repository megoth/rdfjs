import {Fetcher, graph, lit, LiveStore, namedNode, st, UpdateManager} from "rdflib";
import {useEffect, useMemo, useState} from "react";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import {NAME_NODE} from "../../../constants.ts";

export default function RdflibSolidDemo() {
    const {session, fetch} = useSolidAuth();
    const [name, setName] = useState("");
    const profileNode = namedNode(session.webId!);
    const store = useMemo(() => graph() as LiveStore, []);
    const fetcher = useMemo(() => new Fetcher(store, {fetch}), [store, fetch]);
    const updater = useMemo(() => new UpdateManager(store), [store]);

    useEffect(() => {
        if (!store) return;
        fetcher.load(profileNode.doc()).then(() => setName(store.any(profileNode, NAME_NODE, null)?.value || ""));
    }, [store, profileNode, fetcher]);

    const onSubmit = async (data: FormData) => {
        const ins = [st(profileNode, NAME_NODE, lit(data.name), profileNode.doc())];
        const del = store.statementsMatching(profileNode, NAME_NODE, null, profileNode.doc());
        await updater.update(del, ins);
        setName(data.name);
        return store;
    };

    return <Demo name={name} onSubmit={onSubmit}/>
}