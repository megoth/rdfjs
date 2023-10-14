import {SolidProfileShapeType} from "ldo-solid-profile";
import Loading from "../../loading";
import {useLdo, useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";

export default function LDOSolidReactDemo() {
    const {session} = useSolidAuth();
    const {commitData, changeData} = useLdo();
    const profileResource = useResource(session.webId, {reloadOnMount: true});
    const profile = useSubject(SolidProfileShapeType, session.webId);

    if (!profile || !profileResource || profileResource?.isLoading()) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        const updatedProfile = changeData(profile, profileResource);
        updatedProfile.name = data.name;
        await commitData(updatedProfile);
    };

    return <Demo name={profile.name || ""} onSubmit={onSubmit}/>
}