import {SolidProfileShapeType} from "ldo-solid-profile";
import Loading from "../../loading";
import {useLdo, useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import {useState} from "react";

export default function LDOSolidReactDemo() {
    const {session: {webId}} = useSolidAuth();
    const {commitData, changeData, createData} = useLdo();
    const profileResource = useResource(webId, {reloadOnMount: true});
    const profile = useSubject(SolidProfileShapeType, webId);
    const [error, setError] = useState<Error | null>(null);

    if (!profileResource || profileResource?.isLoading()) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        if (!webId) return;
        const oldProfile = profile || createData(SolidProfileShapeType, webId);
        const updatedProfile = changeData(oldProfile, profileResource);
        updatedProfile.name = data.name;
        await commitData(updatedProfile).catch(setError);
    };

    const compoundedError = error || (profileResource.isError ? new Error("Error loading resource") : null);
    return <Demo error={compoundedError} name={profile?.name || ""} onSubmit={onSubmit}/>
}