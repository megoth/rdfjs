import {useEffect, useMemo, useState} from "react";
import Loading from "../../loading";
import useLocalStorage from "use-local-storage";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants";
import {createLdoDataset, LdoDataset, parseRdf, toTurtle} from "@ldo/ldo";
import Demo, {FormData} from "../../demo";
import {simpleSolidProfileShapeType} from "../../../../.ldo/solidProfile.shapeTypes";

export default function LDOLocalDemo() {
    const [dataset, setDataset] = useState<LdoDataset | null>(null);
    const profile = useMemo(() => (dataset && dataset.usingType(simpleSolidProfileShapeType).fromSubject(PROFILE_URI))
        || createLdoDataset().usingType(simpleSolidProfileShapeType).fromSubject(PROFILE_URI), [dataset]);
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_LDO, PROFILE_TURTLE);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        parseRdf(turtle, {baseIRI: PROFILE_URI})
            .then(setDataset)
            .catch(setError);
    }, [turtle]);

    if (!profile && !error) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        profile.name = data.name;
        const turtle = await toTurtle(profile).catch(setError);
        if (turtle) setTurtle(turtle);
    };

    return <Demo error={error} name={profile?.name ?? ""} onSubmit={onSubmit}/>
}