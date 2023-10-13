import {SubmitHandler, useForm} from "react-hook-form";
import {graph, IndexedFormula, lit, namedNode, parse, serialize, st} from "rdflib";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../constants.ts";
import {useEffect, useState} from "react";
import namespace from "solid-namespace";
import useLocalStorage from "use-local-storage";

interface FormData {
    name: string;
}

export default function RdflibDemo() {
    const ns = namespace();
    const profileNode = namedNode(PROFILE_URI);
    const nameNode = namedNode(ns.foaf("name"));
    const [store, setStore] = useState<IndexedFormula>(graph());
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<FormData>();
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE, PROFILE_TURTLE);

    useEffect(() => {
        if (!store) return;

        parse(turtle, store, PROFILE_URI, "text/turtle", (_, updatedStore) => {
            setStore(updatedStore as IndexedFormula || store);
            const name = updatedStore?.any(profileNode, nameNode, null)?.value || "";
            setValue("name", name);
        })
    }, [nameNode, ns, profileNode, setValue, store, turtle]);


    const onSubmit: SubmitHandler<FormData> = async (data) => {
        store.remove(store.match(profileNode, nameNode, null));
        store.add(st(profileNode, nameNode, lit(data.name)));
        serialize(null, store, null, 'text/turtle', (_, result) => setTurtle(result));
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