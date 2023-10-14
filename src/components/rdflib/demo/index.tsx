import {graph, lit, namedNode, parse, serialize, st} from "rdflib";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants.ts";
import {useEffect, useState} from "react";
import namespace from "solid-namespace";
import useLocalStorage from "use-local-storage";
import Demo, {FormData} from "../../demo";

export default function RdflibDemo() {
    const ns = namespace();
    const profileNode = namedNode(PROFILE_URI);
    const nameNode = namedNode(ns.foaf("name"));
    const store = graph();
    const [name, setName] = useState("");
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_TURTLE, PROFILE_TURTLE);

    useEffect(() => {
        if (!store) return;

        parse(turtle, store, PROFILE_URI, "text/turtle", (_, updatedStore) => {
            const name = updatedStore?.any(profileNode, nameNode, null)?.value || "";
            setName(name);
        })
    }, [nameNode, ns, profileNode, store, turtle]);


    const onSubmit = async (data: FormData) => {
        store.remove(store.match(profileNode, nameNode, null));
        store.add(st(profileNode, nameNode, lit(data.name)));
        serialize(null, store, null, 'text/turtle', (_, result) => setTurtle(result));
    };

    return <Demo name={name} onSubmit={onSubmit}/>
}