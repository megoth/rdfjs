import {useEffect, useState} from "react";
import {
    createThing, fromRdfJsDataset, getLiteral, getThing, setLiteral, setThing, toRdfJsDataset
} from "@inrupt/solid-client";
import {type SolidDataset} from "@inrupt/solid-client"
import {FOAF} from "@inrupt/vocab-common-rdf";
import Demo, {FormData} from "../../demo";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants";
import useLocalStorage from "use-local-storage";
import N3 from "n3";
import Loading from "../../loading";
import {literal} from "@rdfjs/data-model";
import {extractError} from "../../../libs/error.ts";

export default function InruptLocalDemo() {
    const [dataset, setDataset] = useState<SolidDataset | null>();
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_INRUPT, PROFILE_TURTLE);
    const profile = dataset && getThing(dataset, PROFILE_URI) || createThing({url: PROFILE_URI});
    const name = profile && getLiteral(profile, FOAF.name)?.value;
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const parser = new N3.Parser({baseIRI: PROFILE_URI, format: "text/turtle"});
        const store = new N3.Store();
        try {
            const parsed = parser.parse(turtle);
            for (const {subject, predicate, object, graph} of parsed) {
                store.addQuad(subject, predicate, object, graph);
            }
            setDataset(fromRdfJsDataset(store));
        } catch (error) {
            setError(extractError(error, "Error occurred while parsing"));
        }
    }, [turtle]);

    if (!dataset && !error) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        setError(null);
        if (!dataset) return;
        const updatedProfile = setLiteral(profile, FOAF.name, literal(data.name));
        const updatedDataset = setThing(dataset, updatedProfile);
        const writer = new N3.Writer();
        const rdfJsDataset = toRdfJsDataset(updatedDataset);
        for (const {subject, predicate, object, graph} of rdfJsDataset) {
            writer.addQuad(subject, predicate, object, graph);
        }
        return new Promise((resolve) => writer.end((error, result) => {
            if (error) setError(error);
            setTurtle(result);
            resolve(result);
        }));
    };

    return <Demo error={error} name={name || ""} onSubmit={onSubmit}/>
}