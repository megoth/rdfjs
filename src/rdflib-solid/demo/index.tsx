import {SubmitHandler, useForm} from "react-hook-form";
import {Fetcher, graph, lit, LiveStore, namedNode, st, UpdateManager} from "rdflib";
import {useEffect} from "react";
import namespace from "solid-namespace";
import {useSolidAuth} from "@ldo/solid-react";

interface FormData {
    name: string;
}

export default function RdflibSolidDemo() {
    const {fetch, session} = useSolidAuth();
    const ns = namespace();
    const profileNode = namedNode(session.webId!);
    const nameNode = namedNode(ns.foaf("name"));
    const store = graph() as LiveStore;
    new Fetcher(store, {fetch});
    new UpdateManager(store);
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<FormData>();

    useEffect(() => {
        if (!store) return;
        store.fetcher.load(profileNode.doc()).then(() => {
            const name = store.any(profileNode, nameNode, null)?.value || "";
            setValue("name", name);
        });
    }, [store, nameNode, ns, profileNode, setValue]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const ins = [st(profileNode, nameNode, lit(data.name), profileNode.doc())];
        const del = store.statementsMatching(profileNode, nameNode, null, profileNode.doc());
        store.updater.update(del, ins)
    };

    return (
        <section className="box">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" {...register("name", {required: true})} />
                    </div>
                </div>
                <div className="control">
                    <button className="button is-primary">Submit</button>
                </div>
            </form>
        </section>
    );
}