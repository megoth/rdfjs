import {useEffect, useState} from "react";
import {
    createSolidDataset, createThing, getLiteral, getSolidDataset, getThing, saveSolidDatasetAt, setLiteral, setThing,
} from "@inrupt/solid-client";
import {type SolidDataset} from "@inrupt/solid-client";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {createLiteral} from "../../../libs/rdf.ts";
import {PROFILE_URI} from "../../../constants.ts";

export default function InruptSolidDemo() {
    const {session: {webId}, fetch} = useSolidAuth();
    const [dataset, setDataset] = useState<SolidDataset>(createSolidDataset());
    const profile = (dataset && webId && getThing(dataset, webId))
        || createThing({url: webId || PROFILE_URI});
    const name = profile && getLiteral(profile, FOAF.name)?.value;
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!webId) return;
        getSolidDataset(webId, {fetch})
            .then(setDataset)
            .catch(setError);
    }, [fetch, webId]);

    if (!error && (!dataset || !webId)) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        const updatedProfile = setLiteral(profile, FOAF.name, createLiteral(data.name));
        const updatedDataset = setThing(dataset, updatedProfile);
        const savedDataset = await saveSolidDatasetAt(webId!, updatedDataset, {fetch})
            .catch(setError);
        if (savedDataset) setDataset(savedDataset);
    };

    return <Demo error={error} name={name || ""} onSubmit={onSubmit}/>
}