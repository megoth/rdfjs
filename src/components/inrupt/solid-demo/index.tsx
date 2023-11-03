import {useEffect, useState} from "react";
import {
    createThing, getLiteral, getSolidDataset, getThing, saveSolidDatasetAt, setLiteral, setThing, SolidDataset
} from "@inrupt/solid-client";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {createLiteral} from "../../../libs/rdf.ts";
import ErrorMessage from "../../error-message";
import {PROFILE_URI} from "../../../constants.ts";

export default function InruptSolidDemo() {
    const {session, fetch} = useSolidAuth();
    const [dataset, setDataset] = useState<SolidDataset | null>(null);
    const profile = (dataset && session.webId && getThing(dataset, session.webId))
        || createThing({url: session.webId || PROFILE_URI});
    const name = profile && getLiteral(profile, FOAF.name)?.value;
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!session.webId) return;
        getSolidDataset(session.webId, {fetch})
            .then(setDataset)
            .catch(setError);
    }, [fetch, session.webId]);

    if (!dataset || !session.webId) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        const updatedProfile = setLiteral(profile, FOAF.name, createLiteral(data.name));
        const updatedDataset = setThing(dataset, updatedProfile);
        const savedDataset = await saveSolidDatasetAt(session.webId!, updatedDataset, {fetch})
            .catch(setError);
        if (savedDataset) setDataset(savedDataset);
    };

    return error
        ? <ErrorMessage error={error}/>
        : <Demo name={name || ""} onSubmit={onSubmit}/>
}