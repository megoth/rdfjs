import Loading from "../../loading";
import {useLdo, useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import {useCallback, useState} from "react";
import {simpleSolidProfileShapeType} from "../../../../.ldo/solidProfile.shapeTypes";

export default function LDOSolidReactDemo() {
    const {session: {webId}} = useSolidAuth();
    const {commitData, changeData, createData} = useLdo();
    const profileResource = useResource(webId, {reloadOnMount: true});
    const profile = useSubject(simpleSolidProfileShapeType, webId);
    const [error, setError] = useState<Error | null>(null);

    // const onSubmit = useCallback(async (data: FormData) => {
    //     setError(null);
    //     if (!webId) return;
    //     console.log("DATA", data);
    //     // const oldProfile = profile || createData(simpleSolidProfileShapeType, webId);
    //     // const updatedProfile = changeData(oldProfile, profileResource);
    //     // updatedProfile.name = data.name;
    //     // await commitData(updatedProfile).catch(setError);
    // }, [changeData, commitData, createData, profile, profileResource, webId]);

    if (!profileResource || profileResource?.isReading()) {
        return <Loading/>
    }

    console.log("DEMO", profile?.name)

    // const compoundedError = error || (profileResource.isError ? new Error("Error loading resource") : null);
    // return <Demo error={compoundedError} name={profile?.name ?? ""} onSubmit={onSubmit}/>
    return <div>test</div>
}