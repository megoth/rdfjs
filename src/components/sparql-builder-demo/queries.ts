import {literal, namedNode} from '@rdfjs/data-model'
import namespace from "@rdfjs/namespace";
import {prefixes} from "@zazuko/rdf-vocabularies";
import {DELETE, SELECT} from "@tpluscode/sparql-builder";

const foaf = namespace(prefixes.foaf)

export function select(webId: string): string {
    return SELECT`?name`
        .WHERE`${namedNode(webId)} ${foaf.name} ?name .`
        .LIMIT(1)
        .build();
}

export function update(webId: string, oldNameValue: string, newNameValue: string) {
    const webIdNode = namedNode(webId);
    const oldName = literal(oldNameValue);
    const newName = literal(newNameValue);
    return DELETE`${webIdNode} ${name} ${oldName}`
        .INSERT`${webIdNode} ${name} ${newName}`
        .WHERE`${webIdNode} ${name} ${oldName}`
        .build();
}