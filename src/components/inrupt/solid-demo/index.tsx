import {SubmitHandler} from "react-hook-form";
import {useEffect, useState} from "react";
import {
    getLiteral, getSolidDataset, getThing, saveSolidDatasetAt, setLiteral, setThing, SolidDataset
} from "@inrupt/solid-client";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {Literal} from "@rdfjs/types"
import {lit} from "rdflib";
import {useSolidAuth} from "@ldo/solid-react";
import Demo from "../../demo";

interface FormData {
    name: string;
}

export default function InruptSolidDemo() {
    const [name, setName] = useState("");
    const [dataset, setDataset] = useState<SolidDataset | null>(null);
    const {session, fetch} = useSolidAuth();

    useEffect(() => {
        if (!session.webId) return;
        getSolidDataset(session.webId, {fetch}).then((dataset) => {
            if (!session.webId) return;
            setDataset(dataset);
            const profile = getThing(dataset, session.webId);
            setName(profile ? getLiteral(profile, FOAF.name)?.value || "" : "");
        })
    }, [fetch, session.webId]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!dataset || !session.webId) return;
        const profile = getThing(dataset, session.webId);
        if (!profile) return;
        const updatedProfile = setLiteral(profile, FOAF.name, lit(data.name) as Literal);
        const updatedDataset = setThing(dataset, updatedProfile);
        const savedDataset = await saveSolidDatasetAt(session.webId, updatedDataset, {fetch});
        setDataset(savedDataset);
    };

    return <Demo name={name} onSubmit={onSubmit}/>
}