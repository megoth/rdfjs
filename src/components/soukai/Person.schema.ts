import { FieldType } from 'soukai';
import { defineSolidModelSchema } from 'soukai-solid';

export default defineSolidModelSchema({
    // This will be used as the default context, so no need to prefix the rest of the terms.
    rdfContext: 'http://xmlns.com/foaf/0.1/',
    // This will be http://xmlns.com/foaf/0.1/Person
    rdfsClass: 'Person',
    // Timestamps are enabled by default, we should disable them here or else we'll be adding them to
    // the user's profile.
    timestamps: false,
    fields: {
        // This is not required by default, and uses the same field name so we can use the shorthand.
        // (This will be http://xmlns.com/foaf/0.1/name)
        name: FieldType.String
    },
});
