import {literal, namedNode, variable} from '@rdfjs/data-model'
import namespace from "@rdfjs/namespace";
import {prefixes} from "@zazuko/rdf-vocabularies";
import * as sparql from "rdf-sparql-builder";

const foaf = namespace(prefixes.foaf)

export function select(webId: string): string {
    return sparql.select([variable('name')])
        .where([[namedNode(webId), foaf.name, variable("name")]])
        .limit(1)
        .build();
}

export function update(webId: string, oldNameValue: string, newNameValue: string) {
    const webIdNode = namedNode(webId);
    const oldName = literal(oldNameValue);
    const newName = literal(newNameValue);
    return sparql.deleteQuery([[webIdNode, foaf.name, oldName]])
        .insert([[webIdNode, foaf.name, newName]])
        .where([[webIdNode, foaf.name, oldName]])
        .build();
}