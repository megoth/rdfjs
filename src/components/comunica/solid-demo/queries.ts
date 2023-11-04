export function select(webId: string): string {
    return `
        PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
        SELECT ?name WHERE {
            <${webId}> foaf:name ?name .
        } LIMIT 1`;
}

export function update(webId: string, oldName: string, newName: string) {
    return `
        PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
        DELETE { <${webId}> foaf:name "${oldName}" }
        INSERT { <${webId}> foaf:name "${newName}" }
        WHERE { <${webId}> foaf:name "${oldName}" }`;
}