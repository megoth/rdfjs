import {useEffect, useState} from "react";
import {
    createThing, getLiteral, getSolidDataset, getThing, saveSolidDatasetAt, setLiteral, setThing,
} from "@inrupt/solid-client";
import {type SolidDataset} from "@inrupt/solid-client";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {literal} from "@rdfjs/data-model";

export default function InruptSolidDemo() {
    const {session: {webId}, fetch} = useSolidAuth();
    const [dataset, setDataset] = useState<SolidDataset | null>(null);
    const profile = (dataset && webId && getThing(dataset, webId))
        || webId && createThing({url: webId});
    const name = profile && getLiteral(profile, FOAF.name)?.value;
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!webId) return;
        getSolidDataset(webId, {fetch})
            .then(setDataset)
            .catch(setError);
    }, [fetch, webId]);

    if (!dataset && !error) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        if (!dataset || !profile) return;
        const updatedProfile = setLiteral(profile, FOAF.name, literal(data.name));
        const updatedDataset = setThing(dataset, updatedProfile);
        return saveSolidDatasetAt(webId, updatedDataset, {fetch})
            .then(setDataset)
            .catch(setError);
    };

    return <Demo error={error} name={name || ""} onSubmit={onSubmit}/>
}