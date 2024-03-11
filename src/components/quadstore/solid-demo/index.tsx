import {useEffect, useMemo, useState} from "react";
import Demo, {FormData} from "../../demo";
import Loading from "../../loading";
import {MemoryLevel} from 'memory-level';
import {Quadstore} from 'quadstore';
import {DataFactory, Parser} from "n3";
import {extractError} from "../../../libs/error.ts";
import {useSolidAuth} from "@ldo/solid-react";
import {FOAF} from "../../../namespaces.ts";

export default function QuadstoreSolidDemo() {
    const {session: {webId}, fetch} = useSolidAuth();
    const backend = new MemoryLevel();
    const store = useMemo(() => new Quadstore({
        backend,
        dataFactory: DataFactory
    }), [backend]);
    const [name, setName] = useState<string | undefined>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!webId) return;
        try {
            fetch(webId, {
                method: "GET",
                headers: {"Content-Type": "text/turtle"},
            }).then(async (response) => {
                const turtle = await response.text();
                const parser = new Parser({baseIRI: webId, format: "text/turtle"});
                const quads = parser.parse(turtle);
                await store.open();
                await store.multiPut(quads);
                const {items} = await store.get({
                    subject: DataFactory.namedNode(webId),
                    predicate: FOAF.name
                });
                setName(items[0].object.value || "");
            });
        } catch (error) {
            setError(extractError(error, "Error occurred while parsing"));
        }
    }, [fetch, webId]);

    if (name === undefined) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData): Promise<void> => {
        setError(null);
        if (!webId) return;
        await Promise.all([
            store.multiPatch(
                [DataFactory.quad(DataFactory.namedNode(webId), FOAF.name, DataFactory.literal(name))],
                [DataFactory.quad(DataFactory.namedNode(webId), FOAF.name, DataFactory.literal(data.name))]
            ),
            fetch(webId, {
                method: "PATCH",
                headers: {"Content-Type": "application/sparql-update"},
                body: `
DELETE DATA { <${webId}> <${FOAF.name.value}> "${name}" . }
INSERT DATA { <${webId}> <${FOAF.name.value}> "${data.name}" . }`
            })
        ]).catch(setError)
        setName(data.name);
    };

    return <Demo error={error} name={name} onSubmit={onSubmit}/>
}