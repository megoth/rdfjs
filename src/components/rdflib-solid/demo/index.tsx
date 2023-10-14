import {Fetcher, graph, lit, LiveStore, namedNode, st, UpdateManager} from "rdflib";
import {useEffect, useState} from "react";
import namespace from "solid-namespace";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";

const ns = namespace();
const nameNode = namedNode(ns.foaf("name"));

export default function RdflibSolidDemo() {
    const {fetch, session} = useSolidAuth();
    const [name, setName] = useState("");
    const profileNode = namedNode(session.webId!);
    const store = graph() as LiveStore;
    new Fetcher(store, {fetch});
    new UpdateManager(store);

    useEffect(() => {
        if (!store) return;
        store.fetcher.load(profileNode.doc()).then(() => setName(store.any(profileNode, nameNode, null)?.value || ""));
    }, [store, profileNode]);

    const onSubmit = async (data: FormData) => {
        setName(data.name);
        const ins = [st(profileNode, nameNode, lit(data.name), profileNode.doc())];
        const del = store.statementsMatching(profileNode, nameNode, null, profileNode.doc());
        await store.updater.update(del, ins)
    };

    return <Demo name={name} onSubmit={onSubmit}/>
}