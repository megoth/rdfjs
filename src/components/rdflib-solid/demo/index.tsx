import {Fetcher, graph, lit, LiveStore, namedNode, st, UpdateManager} from "rdflib";
import {useEffect, useState} from "react";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import {NAME_NODE} from "../../../constants.ts";
import useDeveloperMode from "../../../hooks/use-developer-mode";

export default function RdflibSolidDemo() {
    const {session, ...auth} = useSolidAuth();
    const {fetch} = useDeveloperMode(auth.fetch);
    const [name, setName] = useState("");
    const profileNode = namedNode(session.webId!);
    const store = graph() as LiveStore;
    new Fetcher(store, {fetch});
    new UpdateManager(store);

    useEffect(() => {
        if (!store) return;
        store.fetcher.load(profileNode.doc()).then(() => setName(store.any(profileNode, NAME_NODE, null)?.value || ""));
    }, [store, profileNode]);

    const onSubmit = async (data: FormData) => {
        setName(data.name);
        const ins = [st(profileNode, NAME_NODE, lit(data.name), profileNode.doc())];
        const del = store.statementsMatching(profileNode, NAME_NODE, null, profileNode.doc());
        await store.updater.update(del, ins)
    };

    return <Demo name={name} onSubmit={onSubmit}/>
}