import {SubmitHandler, useForm} from "react-hook-form";
import {useContext, useEffect} from "react";
import NotificationContext from "../../contexts/notification";

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

    useEffect(() => setValue("name", name), [name, setValue]);

    const onSubmitIntermediate = (data: FormData) => {
        notify(`NAME UPDATED: ${data.name}`);
        return onSubmit(data);
    }

    return (
        <section className="box">
            <form onSubmit={handleSubmit(onSubmitIntermediate)}>
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