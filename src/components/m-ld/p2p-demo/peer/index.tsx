import Demo, {FormData} from "../../../demo";
import {useEffect, useMemo, useState} from "react";
import {IoRemotes} from "@m-ld/m-ld/ext/socket.io";
import {clone, uuid, GraphSubject} from "@m-ld/m-ld";
import {MemoryLevel} from "memory-level";
import Loading from "../../../loading";
import {useParams} from "react-router-dom";
import styles from "./styles.module.css";
import {Unpromise} from "../../../../constants";
import {BASE_CONFIG} from "../../constants.ts";
import ErrorMessage from "../../../error-message";

export default function MLdP2PDemoPeer() {
    const {domainId} = useParams();
    const domainUrl = useMemo(() => `${domainId}.public.gw.m-ld.org`, [domainId]);
    const [error, setError] = useState<Error | null>(null);
    const [profile, setProfile] = useState<GraphSubject | undefined>();
    const [peer, setPeer] = useState<Unpromise<ReturnType<typeof clone>> | null>(null);

    useEffect(() => {
        if (!domainId) return;
        clone(new MemoryLevel(), IoRemotes, {
            ...BASE_CONFIG,
            '@id': uuid(),
            '@domain': domainUrl,
            genesis: false,
        })
            .then(async (peer) => {
                await peer.read(
                    (state) => state.get(domainId).then(setProfile),
                    (_update, state) => state.get(domainId).then(setProfile)
                );
                setPeer(peer);
            })
            .catch(setError);
    }, [domainId, domainUrl]);

    if (!profile && !error) return <Loading className={styles.container}/>

    const onSubmit = async (data: FormData) => {
        setError(null);
        if (!peer || !domainId) return;
        await peer.delete(domainId);
        await peer.write({
            "@id": domainId,
            "name": data.name,
        })
    }

    const name = profile?.name?.toString() || "";

    return error
        ? <div className={styles.container}>
            <ErrorMessage error={error}/>
            <button className="button" onClick={() => location.reload()}>Reload demo</button>
        </div>
        : <Demo className={styles.container} name={name} onSubmit={onSubmit} noNotify={true}/>
}