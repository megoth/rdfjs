import {createThing, getLiteral, getThing, setLiteral, setThing} from "@inrupt/solid-client";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import useSolidDataset from "./useSolidDataset.ts";
import {createLiteral} from "../../../libs/rdf.ts";
import {useState} from "react";
import {PROFILE_URI} from "../../../constants.ts";
import ErrorMessage from "../../error-message";

export default function InruptSolidAlternativeDemo() {
    const [error, setError] = useState<Error | null>(null);
    const {session} = useSolidAuth();
    const [profileDataset, saveProfileDataset] = useSolidDataset(session.webId, setError);
    const profile = (profileDataset && session.webId && getThing(profileDataset, session.webId))
        || createThing({url: session.webId || PROFILE_URI});
    const name = profile && getLiteral(profile, FOAF.name)?.value;

    if (!profileDataset) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        const updatedProfile = setLiteral(profile, FOAF.name, createLiteral(data.name));
        const updatedDataset = setThing(profileDataset, updatedProfile);
        await saveProfileDataset(updatedDataset);
    };

    return error
        ? <ErrorMessage error={error} />
        : <Demo name={name || ""} onSubmit={onSubmit}/>
}