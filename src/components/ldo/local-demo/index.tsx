import {useEffect, useState} from "react";
import {SolidProfile, SolidProfileShapeType} from "ldo-solid-profile";
import Loading from "../../loading";
import useLocalStorage from "use-local-storage";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants.ts";
import {parseRdf, toTurtle} from "ldo";
import Demo, {FormData} from "../../demo";
import ErrorMessage from "../../error-message";
import {useLdo} from "@ldo/solid-react";

export default function LDOLocalDemo() {
    const [profile, setProfile] = useState<SolidProfile | null>(null);
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_LDO, PROFILE_TURTLE);
    const [error, setError] = useState<Error | null>(null);
    const {createData} = useLdo();

    useEffect(() => {
        parseRdf(turtle, {baseIRI: PROFILE_URI})
            .then((ldoDataset) => setProfile(ldoDataset.usingType(SolidProfileShapeType).fromSubject(PROFILE_URI)))
            .catch((error) => setError(error));
    }, [turtle]);

    if (!profile && !error) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        const oldProfile = profile || createData(SolidProfileShapeType, PROFILE_URI);
        oldProfile.name = data.name;
        const turtle = await toTurtle(oldProfile).catch(setError);
        if (turtle) setTurtle(turtle);
    };

    return error
        ? <ErrorMessage error={error}/>
        : <Demo name={profile?.name || ""} onSubmit={onSubmit}/>
}