import {SolidModel} from "soukai-solid";
import {FieldType} from "soukai";

export class PersonModel extends SolidModel {
    static rdfsClasses = ['http://xmlns.com/foaf/0.1/Person'];

    static fields = {
        name: {
            type: FieldType.String,
            required: false,
            rdfProperty: 'http://xmlns.com/foaf/0.1/name',
        },
    };
}