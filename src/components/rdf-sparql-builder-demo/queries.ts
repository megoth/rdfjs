import {literal, namedNode, variable} from '@rdfjs/data-model'
import * as sparql from "rdf-sparql-builder";
import {FOAF} from "../../namespaces.ts";

export function select(webId: string): string {
    return sparql.select([variable('name')])
        .where([[namedNode(webId), FOAF.name, variable("name")]])
        .limit(1)
        .build();
}

export function update(webId: string, oldNameValue: string, newNameValue: string) {
    const webIdNode = namedNode(webId);
    const oldName = literal(oldNameValue);
    const newName = literal(newNameValue);
    return sparql.deleteQuery([[webIdNode, FOAF.name, oldName]])
        .insert([[webIdNode, FOAF.name, newName]])
        .where([[webIdNode, FOAF.name, oldName]])
        .build();
}