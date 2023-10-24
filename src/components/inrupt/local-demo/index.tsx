import {SubmitHandler} from "react-hook-form";
import {useEffect, useState} from "react";
import {
    fromRdfJsDataset, getLiteral, getThing, setLiteral, setThing, SolidDataset, toRdfJsDataset
} from "@inrupt/solid-client";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {Literal} from "@rdfjs/types"
import {lit} from "rdflib";
import Demo from "../../demo";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants.ts";
import useLocalStorage from "use-local-storage";
import N3 from "n3";

interface FormData {
    name: string;
}

export default function InruptLocalDemo() {
    const [name, setName] = useState("");
    const [dataset, setDataset] = useState<SolidDataset | null>(null);
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_INRUPT, PROFILE_TURTLE);

    useEffect(() => {
        const store = new N3.Store();
        const parser = new N3.Parser({baseIRI: PROFILE_URI, format: "text/turtle"});
        for (const {subject, predicate, object, graph} of parser.parse(turtle)) {
            store.addQuad(subject, predicate, object, graph);
        }
        const dataset = fromRdfJsDataset(store);
        setDataset(dataset);
        const profile = getThing(dataset, PROFILE_URI);
        setName(profile ? getLiteral(profile, FOAF.name)?.value || "" : "");
    }, [turtle]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!dataset) return;
        const profile = getThing(dataset, PROFILE_URI);
        if (!profile) return;
        const updatedProfile = setLiteral(profile, FOAF.name, lit(data.name) as Literal);
        const updatedDataset = setThing(dataset, updatedProfile);
        const writer = new N3.Writer();
        const rdfJsDataset = toRdfJsDataset(updatedDataset);
        for (const {subject, predicate, object, graph} of rdfJsDataset) {
            writer.addQuad(subject, predicate, object, graph);
        }
        writer.end((_, result) => setTurtle(result))
    };

    return <Demo name={name} onSubmit={onSubmit}/>
}