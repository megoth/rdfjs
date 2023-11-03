import {useEffect, useState} from "react";
import {bootModels, LocalStorageEngine, setEngine} from "soukai";
import Loading from "../../loading";
import {bootSolidModels} from "soukai-solid";
import {PROFILE_JSON, PROFILE_URI} from "../../../constants.ts";
import Demo, {FormData} from "../../demo";
import Person from "../Person.ts";

bootSolidModels();
bootModels({Person});
setEngine(new LocalStorageEngine())

export default function SoukaiLocalDemo() {
    const [person, setPerson] = useState<Person | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        Person.find(PROFILE_URI).then((person) => setPerson(person || new Person({
            url: PROFILE_URI,
            name: PROFILE_JSON.name,
        }))).catch(setError);
    }, []);

    if (!person) {
        return <Loading/>
    }

    const onSubmit = (data: FormData) => {
        setError(null);
        return person.update({name: data.name}).catch(setError);
    };

    return <Demo error={error} name={person.name ?? ""} onSubmit={onSubmit}/>
}