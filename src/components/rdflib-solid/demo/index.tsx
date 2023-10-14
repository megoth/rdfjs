import {Fetcher, graph, lit, LiveStore, namedNode, st, UpdateManager} from "rdflib";
import {useEffect, useState} from "react";
import namespace from "solid-namespace";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";

export default function RdflibSolidDemo() {
    const {fetch, session} = useSolidAuth();
    const ns = namespace();
    const profileNode = namedNode(session.webId!);
    const nameNode = namedNode(ns.foaf("name"));
    const store = graph() as LiveStore;
    new Fetcher(store, {fetch});
    new UpdateManager(store);
    const [name, setName] = useState("");

    useEffect(() => {
        if (!store) return;
        store.fetcher.load(profileNode.doc()).then(() => setName(store.any(profileNode, nameNode, null)?.value || ""));
    }, [store, nameNode, ns, profileNode]);

    const onSubmit = async (data: FormData) => {
        setName(data.name);
        const ins = [st(profileNode, nameNode, lit(data.name), profileNode.doc())];
        const del = store.statementsMatching(profileNode, nameNode, null, profileNode.doc());
        await store.updater.update(del, ins)
    };

    return <Demo name={name} onSubmit={onSubmit}/>
}