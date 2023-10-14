import {useSolidAuth} from "@ldo/solid-react";
import {bootSolidModels, SolidEngine, SolidModel} from 'soukai-solid';
import {bootModels, FieldType, setEngine} from 'soukai';
import {useEffect, useState} from "react";
import Loading from "../../loading";
import Demo, {FormData} from "../../demo";

class Person extends SolidModel {

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

export default function SoukaiSolidDemo() {
    const {fetch, session} = useSolidAuth();
    const [person, setPerson] = useState<Person | null>(null);

    useEffect(() => setEngine(new SolidEngine(fetch)), [fetch]);

    useEffect(() => {
        Person.find(session.webId!).then((person) => setPerson(person))
    }, [session.webId]);

    if (!person) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        person.setAttribute("name", data.name);
        const savedPerson = await person.save(session.webId!);
        setPerson(savedPerson);
    };

    return <Demo name={person.getAttributeValue("name")} onSubmit={onSubmit}/>
}