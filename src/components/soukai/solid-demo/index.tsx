import {useSolidAuth} from "@ldo/solid-react";
import {bootSolidModels, SolidEngine} from 'soukai-solid';
import {bootModels, setEngine} from 'soukai';
import {useEffect, useState} from "react";
import Loading from "../../loading";
import Demo, {FormData} from "../../demo";
import {PersonModel} from "../model.ts";

bootSolidModels();
bootModels({Person: PersonModel});

export default function SoukaiSolidDemo() {
    const {session, fetch} = useSolidAuth();
    const [person, setPerson] = useState<PersonModel | null>(null);

    useEffect(() => setEngine(new SolidEngine(fetch)), [fetch]);

    useEffect(() => {
        if (!session.webId) return;
        PersonModel.find(session.webId).then((person) => setPerson(person))
    }, [session.webId]);

    if (!person) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        person.setAttribute("name", data.name);
        const savedPerson = await person.save(session.webId);
        setPerson(savedPerson);
    };

    const name = person.getAttributeValue("name")?.toString() || "";
    return <Demo name={name} onSubmit={onSubmit}/>
}