import {useEffect, useState} from "react";
import {bootModels, LocalStorageEngine, setEngine} from "soukai";
import Loading from "../../loading";
import {bootSolidModels} from "soukai-solid";
import {PROFILE_JSON} from "../../../constants";
import Demo, {FormData} from "../../demo";
import Person from "../Person.ts";

bootSolidModels();
bootModels({Person});
setEngine(new LocalStorageEngine())

export default function SoukaiLocalDemo() {
    const [person, setPerson] = useState(new Person({
        url: PROFILE_JSON["@id"],
        name: PROFILE_JSON.name,
    }));
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        Person.find(PROFILE_JSON["@id"]).then((person) => {
            if (person) setPerson(person);
        }).catch(setError);
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