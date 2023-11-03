import {useEffect, useState} from "react";
import {SolidProfile, SolidProfileShapeType} from "ldo-solid-profile";
import Loading from "../../loading";
import useLocalStorage from "use-local-storage";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants.ts";
import {parseRdf, toTurtle} from "ldo";
import Demo, {FormData} from "../../demo";
import {useLdo} from "@ldo/solid-react";

export default function LDOLocalDemo() {
    const {createData} = useLdo();
    const [profile, setProfile] = useState<SolidProfile>(createData(SolidProfileShapeType, PROFILE_URI));
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_LDO, PROFILE_TURTLE);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        parseRdf(turtle, {baseIRI: PROFILE_URI})
            .then((ldoDataset) => setProfile(ldoDataset.usingType(SolidProfileShapeType).fromSubject(PROFILE_URI)))
            .catch(setError);
    }, [turtle]);

    if (!profile && !error) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        profile.name = data.name;
        const turtle = await toTurtle(profile).catch(setError);
        if (turtle) setTurtle(turtle);
    };

    return <Demo error={error} name={profile?.name || ""} onSubmit={onSubmit}/>
}