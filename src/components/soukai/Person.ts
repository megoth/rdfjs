import {FieldType} from 'soukai';
import {defineSolidModelSchema} from 'soukai-solid';

const Model = defineSolidModelSchema({
    rdfContext: 'http://xmlns.com/foaf/0.1/',
    rdfsClass: 'Person',
    timestamps: false,
    fields: {
        name: FieldType.String
    },
});

export default class Person extends Model {

}