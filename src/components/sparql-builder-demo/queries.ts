import {literal, namedNode} from '@rdfjs/data-model'
import {DELETE, SELECT} from "@tpluscode/sparql-builder";
import {FOAF} from "../../namespaces.ts";

export function select(webId: string): string {
    return SELECT`?name`
        .WHERE`${namedNode(webId)} ${FOAF.name} ?name .`
        .LIMIT(1)
        .build();
}

export function update(webId: string, oldNameValue: string, newNameValue: string) {
    const webIdNode = namedNode(webId);
    const oldName = literal(oldNameValue);
    const newName = literal(newNameValue);
    return DELETE`${webIdNode} ${FOAF.name} ${oldName}`
        .INSERT`${webIdNode} ${FOAF.name} ${newName}`
        .WHERE`${webIdNode} ${FOAF.name} ${oldName}`
        .build();
}