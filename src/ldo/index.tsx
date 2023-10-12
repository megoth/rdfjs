import {useEffect, useState} from "react";
import {profileTurtle, profileUri} from "../constants.ts";
import {parseRdf} from "ldo";
import {getName, SolidProfile, SolidProfileShapeType} from "ldo-solid-profile";
import Loading from "../loading";
import Code from "../code";

export default function LDO() {
    const [profile, setProfile] = useState<SolidProfile | null>(null);
    const [turtle] = useState(profileTurtle);

    useEffect(() => {
        (async () => {
            const ldoDataset = await parseRdf(profileTurtle, {baseIri: profileUri});
            setProfile(ldoDataset.usingType(SolidProfileShapeType).fromSubject(profileUri));
        })();
    }, []);

    if (!profile) {
        return <Loading/>
    }

    return (
        <>
            <h1 className="title">LDO (Linked Data Objects)</h1>
            <div>Howdy, {getName(profile)}</div>
            <Code language="turtle">{turtle}</Code>
        </>
    )
}