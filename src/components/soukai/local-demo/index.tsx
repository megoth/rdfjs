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

    useEffect(() => {
        // Find the model by its url.
        Person.find(PROFILE_URI).then((person) => {
            if (!person) {
                // Create the model if it's not already in the storage
                // (won't be added to the storage until saved, if you wanted to store it you could do Person.create() instead).
                setPerson(new Person({
                    url: PROFILE_URI,
                    name: PROFILE_JSON.name,
                }));

                return;
            }

            setPerson(person);
        });
    }, []);

    if (!person) {
        return <Loading/>
    }

    // Calling the update method also saves the changes to storage database.
    // (it's the equivalent of calling setAttributes() + save())
    const onSubmit = (data: FormData) => person.update({ name: data.name });

    // Given that name is not required, we must provide a default value
    // or the UI is stuck loading.
    return <Demo name={person.name ?? '(Unknown)'} onSubmit={onSubmit}/>
}
