import {useEffect, useState} from "react";
import {getName, SolidProfile, SolidProfileShapeType} from "ldo-solid-profile";
import Loading from "../loading";
import Code from "../code";
import {parseRdf, toTurtle} from "ldo";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../constants.ts";
import useLocalStorage from "use-local-storage";
import LDODemo from "./demo";

export default function LDO() {
    const [profile, setProfile] = useState<SolidProfile | null>(null);
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE, PROFILE_TURTLE);

    useEffect(() => {
        (async () => {
            const ldoDataset = await parseRdf(turtle, {baseIri: PROFILE_URI});
            setProfile(ldoDataset.usingType(SolidProfileShapeType).fromSubject(PROFILE_URI));
        })();
    }, [turtle]);

    if (!profile) {
        return <Loading/>
    }

    const onSubmit = async (updatedProfile: SolidProfile) => setTurtle(await toTurtle(updatedProfile))

    return (
        <>
            <h1 className="title">LDO (Linked Data Objects)</h1>
            <div>Howdy, {getName(profile)}</div>
            <Code language="turtle">{turtle}</Code>
            <LDODemo onSubmitted={onSubmit} profile={profile}/>
        </>
    )
}