import {useSolidAuth} from "@ldo/solid-react";
import {bootSolidModels, SolidEngine} from 'soukai-solid';
import {bootModels, setEngine} from 'soukai';
import {useEffect, useState} from "react";
import Loading from "../../loading";
import Demo, {FormData} from "../../demo";
import Person from "../Person.ts";

bootSolidModels();
bootModels({Person});

export default function SoukaiSolidDemo() {
    const {session, fetch} = useSolidAuth();
    const [person, setPerson] = useState<Person | null>(null);

    useEffect(() => setEngine(new SolidEngine(fetch)), [fetch]);

    useEffect(() => {
        if (!session.webId) return;
        Person.find(session.webId).then((person) => setPerson(person));
    }, [session.webId]);

    if (!person) {
        return <Loading/>
    }

    const onSubmit = (data: FormData) => person.update({ name: data.name });

    return <Demo name={person.name ?? '(Unknown)'} onSubmit={onSubmit}/>
}
