import {useEffect, useState} from "react";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../constants.ts";
import {parseRdf, toTurtle} from "ldo";
import {getName, SolidProfile, SolidProfileShapeType} from "ldo-solid-profile";
import Loading from "../loading";
import Code from "../code";
import {SubmitHandler, useForm} from "react-hook-form";
import useLocalStorage from "use-local-storage";

interface FormData {
    name: string;
}

export default function LDO() {
    const [profile, setProfile] = useState<SolidProfile | null>(null);
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE, PROFILE_TURTLE);
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<FormData>()

    useEffect(() => {
        (async () => {
            const ldoDataset = await parseRdf(turtle, {baseIri: PROFILE_URI});
            setProfile(ldoDataset.usingType(SolidProfileShapeType).fromSubject(PROFILE_URI));
        })();
    }, [turtle]);

    useEffect(() => {
        if (!profile) return;
        setValue("name", getName(profile))
    }, [profile, setValue]);

    if (!profile) {
        return <Loading/>
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        profile.name = data.name;
        setTurtle(await toTurtle(profile));
    }

    return (
        <>
            <h1 className="title">LDO (Linked Data Objects)</h1>
            <div>Howdy, {getName(profile)}</div>
            <Code language="turtle">{turtle}</Code>
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
        </>
    )
}