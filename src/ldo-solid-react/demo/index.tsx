import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";
import {SolidProfileShapeType} from "ldo-solid-profile";
import Loading from "../../loading";
import {useLdo, useResource, useSolidAuth, useSubject} from "@ldo/solid-react";

interface FormData {
    name: string;
}

export default function LDOSolidReactDemo() {
    const {session} = useSolidAuth();
    const {commitData, changeData} = useLdo();
    const profileResource = useResource(session.webId);
    const profile = useSubject(SolidProfileShapeType, session.webId);
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<FormData>();

    useEffect(() => {
        if (!profile || profileResource?.isLoading()) return;
        setValue("name", profile.name || "")
    }, [profile, profileResource, setValue]);

    if (!profile || profileResource?.isLoading()) {
        return <Loading/>
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!profile || !profileResource) return;
        const updatedProfile = changeData(profile, profileResource);
        updatedProfile.name = data.name;
        await commitData(updatedProfile);
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