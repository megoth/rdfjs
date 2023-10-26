import {useMemo} from "react";
import {Fetcher, graph, LiveStore, UpdateManager} from "rdflib";
import {useSolidAuth} from "@ldo/solid-react";

export default function useStore() {
    const {fetch} = useSolidAuth();
    return useMemo(() => {
        const store = graph() as LiveStore;
        new Fetcher(store, {fetch});
        new UpdateManager(store);
        return store;
    }, [fetch]);
}