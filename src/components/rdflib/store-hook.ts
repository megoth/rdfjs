import {useMemo} from "react";
import {Fetcher, graph, LiveStore, UpdateManager} from "rdflib";
import {useSolidAuth} from "@ldo/solid-react";

export default function useStore() {
    const {fetch} = useSolidAuth();
    const store = useMemo(() => graph() as LiveStore, []);
    useMemo(() => new Fetcher(store, {fetch}), [fetch, store]);
    useMemo(() => new UpdateManager(store), [store]);
    return store;
}