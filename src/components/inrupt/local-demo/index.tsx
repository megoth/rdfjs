import {useEffect, useState} from "react";
import {
    fromRdfJsDataset, getLiteral, getThing, setLiteral, setThing, SolidDataset, toRdfJsDataset
} from "@inrupt/solid-client";
import {FOAF} from "@inrupt/vocab-common-rdf";
import {Literal} from "@rdfjs/types"
import {lit} from "rdflib";
import Demo, {FormData} from "../../demo";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants.ts";
import useLocalStorage from "use-local-storage";
import N3 from "n3";
import Loading from "../../loading";

export default function InruptLocalDemo() {
    const [dataset, setDataset] = useState<SolidDataset | null>(null);
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_INRUPT, PROFILE_TURTLE);
    const profile = dataset && getThing(dataset, PROFILE_URI);
    const name = profile ? getLiteral(profile, FOAF.name)?.value || "" : "";

    useEffect(() => {
        const parser = new N3.Parser({baseIRI: PROFILE_URI, format: "text/turtle"});
        const store = new N3.Store();
        for (const {subject, predicate, object, graph} of parser.parse(turtle)) {
            store.addQuad(subject, predicate, object, graph);
        }
        setDataset(fromRdfJsDataset(store));
    }, [turtle]);

    if (!dataset || !profile || !name) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
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