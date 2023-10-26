import {useEffect, useState} from "react";
import {
    getLiteral, getSolidDataset, getThing, saveSolidDatasetAt, setLiteral, setThing, SolidDataset
} from "@inrupt/solid-client";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {Literal} from "@rdfjs/types"
import {lit} from "rdflib";
import {useSolidAuth} from "@ldo/solid-react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";

export default function InruptSolidDemo() {
    const {session, fetch} = useSolidAuth();
    const [dataset, setDataset] = useState<SolidDataset | null>(null);
    const profile = dataset && session.webId && getThing(dataset, session.webId);
    const name = profile ? getLiteral(profile, FOAF.name)?.value || "" : "";

    useEffect(() => {
        if (!session.webId) return;
        getSolidDataset(session.webId, {fetch}).then(setDataset)
    }, [fetch, session.webId]);

    if (!dataset || !session.webId || !profile) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        const updatedProfile = setLiteral(profile, FOAF.name, lit(data.name) as Literal);
        const updatedDataset = setThing(dataset, updatedProfile);
        const savedDataset = await saveSolidDatasetAt(session.webId!, updatedDataset, {fetch});
        setDataset(savedDataset);
    };

    return <Demo name={name} onSubmit={onSubmit}/>
}