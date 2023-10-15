import {useEffect, useState} from "react";
import {bootModels, FieldType, InMemoryEngine, setEngine} from "soukai";
import Loading from "../../loading";
import {bootSolidModels, SolidModel} from "soukai-solid";
import useLocalStorage from "use-local-storage";
import {PERSON_JSON, STORAGE_KEYS} from "../../../constants.ts";
import Demo, {FormData} from "../../demo";

export class Person extends SolidModel {

    static rdfsClasses = ['http://xmlns.com/foaf/0.1/Person'];

    static fields = {
        name: {
            type: FieldType.String,
            rdfProperty: 'http://xmlns.com/foaf/0.1/name',
        },
    };
}

bootSolidModels();
bootModels({Person});

export default function SoukaiDemo() {
    const [person, setPerson] = useState<Person | null>(null);
    const [json, setJson] = useLocalStorage(STORAGE_KEYS.PROFILE_JSON, "");

    useEffect(() => setEngine(new InMemoryEngine()), []);

    useEffect(() => {
        (json.length ? Person.createFromJsonLD(JSON.parse(json)) : Person.create(PERSON_JSON)).then(setPerson);
    }, [json]);

    if (!person) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        person.setAttribute("name", data.name);
        setJson(JSON.stringify(person.toJsonLD()))
    };

    return <Demo name={person.getAttributeValue("name")} onSubmit={onSubmit}/>
}