import {SubmitHandler, useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import NotificationContext from "../../contexts/notification";
import Loading from "../loading";

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
    const { notify } = useContext(NotificationContext);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => setValue("name", name), [name, setValue]);

    const onSubmitIntermediate = async (data: FormData) => {
        if (isSyncing) return;
        notify(<>Name updated: <strong>{data.name}</strong></>);
        setIsSyncing(true);
        await onSubmit(data);
        setIsSyncing(false);
    }

    return name ? (
        <section className="box">
            <form onSubmit={handleSubmit(onSubmitIntermediate)}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" {...register("name", {required: true})} disabled={isSyncing} />
                    </div>
                </div>
                <div className="control">
                    <button className="button is-primary" disabled={isSyncing}>Submit</button>
                </div>
            </form>
        </section>
    ) : <Loading />
}