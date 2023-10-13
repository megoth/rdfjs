import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {SolidProfile, SolidProfileShapeType} from "ldo-solid-profile";
import Loading from "../../loading";
import useLocalStorage from "use-local-storage";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../constants.ts";
import {parseRdf, toTurtle} from "ldo";

interface FormData {
    name: string;
}

export default function LDODemo() {
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<FormData>()
    const [profile, setProfile] = useState<SolidProfile | null>(null);
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE, PROFILE_TURTLE);

    useEffect(() => {
        (async () => {
            const ldoDataset = await parseRdf(turtle, {baseIri: PROFILE_URI});
            setProfile(ldoDataset.usingType(SolidProfileShapeType).fromSubject(PROFILE_URI));
        })();
    }, [turtle]);

    useEffect(() => {
        if (!profile) return;
        setValue("name", profile.name || "")
    }, [profile, setValue]);

    if (!profile) {
        return <Loading/>
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        profile.name = data.name;
        setTurtle(await toTurtle(profile));
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