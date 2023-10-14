import {SubmitHandler} from "react-hook-form";
import {useEffect, useState} from "react";
import {SolidProfile, SolidProfileShapeType} from "ldo-solid-profile";
import Loading from "../../loading";
import useLocalStorage from "use-local-storage";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants.ts";
import {parseRdf, toTurtle} from "ldo";
import Demo, {FormData} from "../../demo";

export default function LDODemo() {
    const [profile, setProfile] = useState<SolidProfile | null>(null);
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_TURTLE, PROFILE_TURTLE);

    useEffect(() => {
        parseRdf(turtle, {baseIRI: PROFILE_URI}).then((ldoDataset) => {
            const foundProfile = ldoDataset.usingType(SolidProfileShapeType).fromSubject(PROFILE_URI);
            setProfile(foundProfile);
        });
    }, [turtle]);

    if (!profile) {
        return <Loading/>
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        profile.name = data.name;
        setTurtle(await toTurtle(profile));
    };

    return <Demo name={profile.name || ""} onSubmit={onSubmit}/>
}