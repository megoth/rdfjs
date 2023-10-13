import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";
import {SolidProfile} from "ldo-solid-profile";
import Loading from "../../loading";

interface Props {
    onSubmitted: (profile: SolidProfile) => Promise<void>
    profile: SolidProfile
}

interface FormData {
    name: string;
}

export default function LDODemo({ onSubmitted, profile }: Props) {
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<FormData>()

    useEffect(() => {
        if (!profile) return;
        setValue("name", profile.name || "")
    }, [profile, setValue]);

    if (!profile) {
        return <Loading/>
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        profile.name = data.name;
        await onSubmitted(profile);
    }

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
    )
}