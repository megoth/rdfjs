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
    const {session: {webId}, fetch} = useSolidAuth();
    const [person, setPerson] = useState(new Person({url: webId}));
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => setEngine(new SolidEngine(fetch)), [fetch]);

    useEffect(() => {
        if (!webId) return;
        Person.find(webId).then((person) => {
            if (person) setPerson(person);
        }).catch(setError);
    }, [webId]);

    if (!person) {
        return <Loading/>
    }

    const onSubmit = (data: FormData) => {
        setError(null);
        return person.update({name: data.name}).catch(setError);
    };

    return <Demo error={error} name={person.name ?? ""} onSubmit={onSubmit}/>
}