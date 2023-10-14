import {SubmitHandler, useForm} from "react-hook-form";
import {useSolidAuth} from "@ldo/solid-react";
import {bootSolidModels, SolidEngine, SolidModel} from 'soukai-solid';
import {bootModels, FieldType, setEngine} from 'soukai';
import {useEffect, useState} from "react";
import Loading from "../../loading";

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

export default function SoukaiSolidDemo() {
    const {fetch, session} = useSolidAuth();
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<FormData>();
    const [person, setPerson] = useState<Person | null>(null);

    useEffect(() => setEngine(new SolidEngine(fetch)), [fetch]);

    useEffect(() => {
        Person.find(session.webId!).then((existingPerson) => {
            setPerson(existingPerson);
            setValue("name", existingPerson?.getAttributes().name);
        })
    }, [session.webId, setValue]);

    if (!person) {
        return <Loading/>
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        person.setAttribute("name", data.name);
        const savedPerson = await person.save(session.webId!);
        setPerson(savedPerson);
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