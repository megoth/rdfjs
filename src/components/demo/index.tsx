import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import useNotification from "../../hooks/use-notification";
import Box from "../box";
import ErrorMessage from "../error-message";
import {clsx} from "clsx";

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
        setValue,
        formState: {errors},
    } = useForm<FormData>();
    const {notify} = useNotification();
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => setValue("name", name || ""), [name, setValue]);

    const onSubmitIntermediate = async (data: FormData) => {
        if (isSyncing) return;
        setIsSyncing(true);
        await onSubmit(data);
        setIsSyncing(false);
        notify(<>Name updated: <strong>{data.name}</strong></>);
    }

    return <Box>
        <form onSubmit={handleSubmit(onSubmitIntermediate)}>
            {!name && <ErrorMessage error={new Error("No name found. Please enter a name.")}/>}
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input type="text" {...register("name", {required: true})}
                           className={clsx("input", {"is-danger": errors.name})} disabled={isSyncing}/>
                </div>
                {errors.name && <p className="help is-danger">Name is required</p>}
            </div>
            <div className="control">
                <button className="button is-primary" disabled={isSyncing}>Submit</button>
            </div>
        </form>
    </Box>
}