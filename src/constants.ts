export const profileUri = "https://example.com/profile";

export const profileTurtle = `@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix schema: <http://schema.org/>.
@prefix vcard: <http://www.w3.org/2006/vcard/ns#>.

<${profileUri}>
    a schema:Person, foaf:Person;
    vcard:fn "Test";
    foaf:name "Test".
`;