import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import Loading from "../loading";
import useNotification from "../../hooks/use-notification";

interface Props {
    name: string,
    onSubmit: SubmitHandler<FormData>
}

export interface FormData {
    name: string;
}

export default function Demo({name, onSubmit}: Props) {
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<FormData>();
    const {notify} = useNotification();
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => setValue("name", name), [name, setValue]);

    const onSubmitIntermediate = async (data: FormData) => {
        if (isSyncing) return;
        setIsSyncing(true);
        await onSubmit(data);
        setIsSyncing(false);
        notify(<>Name updated: <strong>{data.name}</strong></>);
    }

    return name ? (
        <section className="box">
            <form onSubmit={handleSubmit(onSubmitIntermediate)}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" {...register("name", {required: true})}
                               disabled={isSyncing}/>
                    </div>
                </div>
                <div className="control">
                    <button className="button is-primary" disabled={isSyncing}>Submit</button>
                </div>
            </form>
        </section>
    ) : <Loading/>
}