import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {
    getLiteral,
    getSolidDataset,
    getThing,
    saveSolidDatasetAt,
    setLiteral,
    setThing,
    SolidDataset
} from "@inrupt/solid-client";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {Literal} from "@rdfjs/types"
import {lit} from "rdflib";
import {useSolidAuth} from "@ldo/solid-react";

interface FormData {
    name: string;
}

export default function InruptDemo() {
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<FormData>();
    const [dataset, setDataset] = useState<SolidDataset | null>(null);
    const {fetch, session} = useSolidAuth();

    useEffect(() => {
        (async () => {
            const dataset = await getSolidDataset(session.webId!, {fetch});
            setDataset(dataset);
            const profile = getThing(dataset, session.webId!)!;
            const name = getLiteral(profile, FOAF.name);
            setValue("name", name?.value || "")
        })();
    }, [fetch, session.webId, setValue]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!dataset) return;
        const profile = getThing(dataset, session.webId!)!;
        const updatedProfile = setLiteral(profile, FOAF.name, lit(data.name) as Literal);
        const updatedDataset = setThing(dataset, updatedProfile);
        const savedDataset = await saveSolidDatasetAt(session.webId!, updatedDataset, {fetch});
        setDataset(savedDataset);
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