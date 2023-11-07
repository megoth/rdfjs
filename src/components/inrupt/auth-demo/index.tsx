import {useState} from "react";
import {
    createSolidDataset, getLiteral, getThing, hasResourceInfo, setLiteral, setThing,
} from "@inrupt/solid-client";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {literal} from "@rdfjs/data-model";
import useAuthenticatedSolidDataset from "./useAuthenticatedSolidDataset.ts";

export default function InruptAuthDemo() {
    const {session: {webId}} = useSolidAuth();
    const [error, setError] = useState<Error | null>(null);
    const [profileDataset, saveProfileDataset] = useAuthenticatedSolidDataset(webId, setError);
    const profile = profileDataset && webId && getThing(profileDataset, webId);
    const name = profile && getLiteral(profile, FOAF.name)?.value || "Stranger";

    if (!error && (!profileDataset || !webId)) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        if (!profile) return;

        const updatedProfile = setLiteral(profile, FOAF.name, literal(data.name));
        const oldDataset = profileDataset || createSolidDataset();
        const updatedDataset = setThing(oldDataset, updatedProfile);
        await saveProfileDataset(updatedDataset)
            .then((...args) => {
                console.log("UPDATING", args);
            })
            .catch((error) => {
                console.log("UPDATING ERROR", error);
                setError(error);
            });
    };

    return <Demo error={error} name={name ?? "Stranger"} onSubmit={onSubmit}/>
}