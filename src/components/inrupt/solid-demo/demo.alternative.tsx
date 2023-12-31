import {createThing, getLiteral, getThing, setLiteral, setThing} from "@inrupt/solid-client";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import useSolidDataset from "./useSolidDataset.ts";
import {useState} from "react";
import {literal} from "@rdfjs/data-model";

export default function InruptSolidAlternativeDemo() {
    const [error, setError] = useState<Error | null>(null);
    const {session: {webId}} = useSolidAuth();
    const [profileDataset, saveProfileDataset] = useSolidDataset(webId, setError);
    const profile = (profileDataset && webId && getThing(profileDataset, webId))
        || webId && createThing({url: webId});
    const name = profile && getLiteral(profile, FOAF.name)?.value;

    if (!profileDataset && !error) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        if (!profile || !profileDataset) return;
        const updatedProfile = setLiteral(profile, FOAF.name, literal(data.name));
        const updatedDataset = setThing(profileDataset, updatedProfile);
        await saveProfileDataset(updatedDataset);
    };

    return <Demo error={error} name={name || ""} onSubmit={onSubmit}/>
}