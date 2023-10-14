import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {bootModels, FieldType, InMemoryEngine, setEngine} from "soukai";
import Loading from "../../loading";
import {bootSolidModels, SolidModel} from "soukai-solid";
import useLocalStorage from "use-local-storage";
import {STORAGE_KEYS} from "../../constants.ts";

interface FormData {
    name: string;
}

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

export default function SoukaiDemo() {
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<FormData>();
    const [person, setPerson] = useState<Person | null>(null);
    const [json, setJson] = useLocalStorage(STORAGE_KEYS.PROFILE_JSON, "");

    useEffect(() => setEngine(new InMemoryEngine()), []);

    useEffect(() => {
        (async () => {
            const matchedPerson = json.length ? await Person.createFromJsonLD(JSON.parse(json)) : await Person.create({
                id: 1,
                name: "Soukai Test"
            });
            setPerson(matchedPerson);
            setValue("name", matchedPerson.getAttributeValue("name"));
        })();
    }, [json, setValue]);

    if (!person) {
        return <Loading/>
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        person.setAttribute("name", data.name);
        const savedPerson = await person.save();
        setPerson(savedPerson);
        setJson(JSON.stringify(savedPerson.toJsonLD()))
    };

    return (
        <section className="box">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" {...register("name", {required: true})} />
                    </div>
                </div>
                <div className="control">
                    <button className="button is-primary">Submit</button>
                </div>
            </form>
        </section>
    );
}