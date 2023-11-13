import {SubmitHandler, useForm} from "react-hook-form";
import {HTMLAttributes, useEffect, useState} from "react";
import useNotification from "../../hooks/use-notification";
import Box from "../box";
import ErrorMessage from "../error-message";
import {clsx} from "clsx";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "onSubmit"> {
    error?: Error | null
    name: string
    noNotify?: boolean
    onSubmit: SubmitHandler<FormData>
}

export interface FormData {
    name: string;
}

export default function Demo({error, name, noNotify, onSubmit, ...props}: Props) {
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
        if (!noNotify) notify(<>Name updated: <strong>{data.name}</strong></>);
    }

    return <Box {...props}>
        <form onSubmit={handleSubmit(onSubmitIntermediate)}>
            {(error || !name) && <ErrorMessage
                error={error || new Error("No name found. We'll set the name for you when you submit.")}/>}
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