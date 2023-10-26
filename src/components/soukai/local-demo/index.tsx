import {useEffect, useState} from "react";
import {bootModels, InMemoryEngine, setEngine} from "soukai";
import Loading from "../../loading";
import {bootSolidModels} from "soukai-solid";
import useLocalStorage from "use-local-storage";
import {PROFILE_JSON, STORAGE_KEYS} from "../../../constants.ts";
import Demo, {FormData} from "../../demo";
import {PersonModel} from "../model.ts";

bootSolidModels();
bootModels({Person: PersonModel});
setEngine(new InMemoryEngine())

export default function SoukaiLocalDemo() {
    const [json, setJson] = useLocalStorage(STORAGE_KEYS.PROFILE_SOUKAI, "");
    const [person, setPerson] = useState<PersonModel | null>(null);

    useEffect(() => {
        const matchedPersonPromise = json.length
            ? PersonModel.createFromJsonLD(JSON.parse(json))
            : PersonModel.create(PROFILE_JSON);
        matchedPersonPromise.then(setPerson);
    }, [json]);

    if (!person) {
        return <Loading/>
    }

    const onSubmit = async (data: FormData) => {
        person.setAttribute("name", data.name);
        setJson(JSON.stringify(person.toJsonLD()))
    };

    const name = person.getAttributeValue("name")?.toString() || "";
    return <Demo name={name} onSubmit={onSubmit}/>
}