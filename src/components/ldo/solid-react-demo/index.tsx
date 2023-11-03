import {SolidProfileShapeType} from "ldo-solid-profile";
import Loading from "../../loading";
import {useLdo, useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import {useState} from "react";
import ErrorMessage from "../../error-message";

export default function LDOSolidReactDemo() {
    const {session} = useSolidAuth();
    const {commitData, changeData} = useLdo();
    const profileResource = useResource(session.webId, {reloadOnMount: true});
    const profile = useSubject(SolidProfileShapeType, session.webId);
    const [error, setError] = useState<Error | null>(null);

    if (!profile || !profileResource || profileResource?.isLoading()) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        const updatedProfile = changeData(profile, profileResource);
        updatedProfile.name = data.name;
        await commitData(updatedProfile).catch(setError);
    };

    return error || profileResource.isError
        ? (error
            ? <ErrorMessage error={error}/>
            : <ErrorMessage error={new Error("Error loading resource")}/>)
        : <Demo name={profile.name || ""} onSubmit={onSubmit}/>
}