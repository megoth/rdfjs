import {getLiteral, getThing, setLiteral, setThing} from "@inrupt/solid-client";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import useSolidDataset from "./useSolidDataset.ts";
import {createLiteral} from "../../../libs/rdf.ts";

export default function InruptSolidAlternativeDemo() {
    const {session} = useSolidAuth();
    const [profileDataset, saveProfileDataset] = useSolidDataset(session.webId);
    const profile = profileDataset && session.webId && getThing(profileDataset, session.webId);
    const name = profile ? getLiteral(profile, FOAF.name)?.value || "" : "";

    if (!profile) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        const updatedProfile = setLiteral(profile, FOAF.name, createLiteral(data.name));
        const updatedDataset = setThing(profileDataset, updatedProfile);
        await saveProfileDataset(updatedDataset);
    };

    return <Demo name={name} onSubmit={onSubmit}/>
}