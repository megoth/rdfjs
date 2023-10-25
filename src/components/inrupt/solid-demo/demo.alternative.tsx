import {SubmitHandler} from "react-hook-form";
import {useMemo} from "react";
import {getLiteral, getThing, setLiteral, setThing} from "@inrupt/solid-client";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {Literal} from "@rdfjs/types"
import {lit} from "rdflib";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import useSolidDataset from "./useSolidDataset.ts";

export default function InruptSolidAlternativeDemo() {
    const {session} = useSolidAuth();
    const [profileDataset, saveProfileDataset] = useSolidDataset(session.webId);
    const profile = useMemo(
        () => profileDataset && session.webId && getThing(profileDataset, session.webId),
        [profileDataset, session.webId]
    );
    const name = useMemo(
        () => profile ? getLiteral(profile, FOAF.name)?.value || "" : "",
        [profile]
    );

    if (!profileDataset || !session.webId || !profile) {
        return <Loading/>
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const updatedProfile = setLiteral(profile, FOAF.name, lit(data.name) as Literal);
        const updatedDataset = setThing(profileDataset, updatedProfile);
        await saveProfileDataset(updatedDataset);
    };

    return <Demo name={name} onSubmit={onSubmit}/>
}