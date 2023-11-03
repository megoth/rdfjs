import {useEffect, useState} from "react";
import {
    fromRdfJsDataset,
    getLiteral,
    getThing,
    setLiteral,
    setThing,
    SolidDataset,
    toRdfJsDataset
} from "@inrupt/solid-client";
import {FOAF} from "@inrupt/vocab-common-rdf";
import Demo, {FormData} from "../../demo";
import {PROFILE_TURTLE, PROFILE_URI, STORAGE_KEYS} from "../../../constants.ts";
import useLocalStorage from "use-local-storage";
import N3 from "n3";
import Loading from "../../loading";
import {createLiteral} from "../../../libs/rdf.ts";
import ErrorMessage from "../../error-message";

export default function InruptLocalDemo() {
    const [dataset, setDataset] = useState<SolidDataset | null>(null);
    const [turtle, setTurtle] = useLocalStorage(STORAGE_KEYS.PROFILE_INRUPT, PROFILE_TURTLE);
    const profile = dataset && getThing(dataset, PROFILE_URI);
    const name = profile && getLiteral(profile, FOAF.name)?.value;
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const parser = new N3.Parser({baseIRI: PROFILE_URI, format: "text/turtle"});
        const store = new N3.Store();
        const parsed = parser.parse(turtle, null, (error) => setError(new Error(error)));
        for (const {subject, predicate, object, graph} of parsed) {
            store.addQuad(subject, predicate, object, graph);
        }
        setDataset(fromRdfJsDataset(store));
    }, [turtle]);

    if (!dataset || !profile) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        const updatedProfile = setLiteral(profile, FOAF.name, createLiteral(data.name));
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

    return error
        ? <ErrorMessage error={error}/>
        : <Demo name={name || ""} onSubmit={onSubmit}/>
}