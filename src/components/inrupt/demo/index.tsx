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

export default function InruptDemo() {
    const [name, setName] = useState("");
    const [dataset, setDataset] = useState<SolidDataset | null>(null);
    const {session, fetch} = useSolidAuth();

    useEffect(() => {
        getSolidDataset(session.webId!, {fetch}).then((dataset) => {
            setDataset(dataset);
            const profile = getThing(dataset, session.webId!)!;
            const name = getLiteral(profile, FOAF.name);
            setName(name?.value || "");
        })
    }, [fetch, session.webId]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!dataset) return;
        const profile = getThing(dataset, session.webId!)!;
        const updatedProfile = setLiteral(profile, FOAF.name, lit(data.name) as Literal);
        const updatedDataset = setThing(dataset, updatedProfile);
        const savedDataset = await saveSolidDatasetAt(session.webId!, updatedDataset, {fetch});
        setDataset(savedDataset);
    };

    return <Demo name={name} onSubmit={onSubmit}/>
}