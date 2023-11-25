import Demo, {FormData} from "../../demo";
import {useEffect, useMemo, useState} from "react";
import {IoRemotes, MeldIoConfig} from "@m-ld/m-ld/ext/socket.io";
import {clone, GraphSubject, uuid} from "@m-ld/m-ld";
import {MemoryLevel} from "memory-level";
import Loading from "../../loading";
import {useParams} from "react-router-dom";
import styles from "./styles.module.css";
import {Unpromise} from "../../../constants.tsx";
import ErrorMessage from "../../error-message";
import Content from "../../content";
import {extractError} from "../../../libs/error.ts";
import {FOAF} from "../../../namespaces.ts";

export default function MLdPeer() {
    const {domainId} = useParams();
    const domainUrl = useMemo(() => `${domainId}.public.gw.m-ld.org`, [domainId]);
    const [peer, setPeer] = useState<Unpromise<ReturnType<typeof clone>> | null>(null);
    const [profile, setProfile] = useState<GraphSubject | undefined>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!domainId) return;
        clone(new MemoryLevel(), IoRemotes, {
            '@id': uuid(),
            '@domain': domainUrl,
            genesis: false,
            io: {uri: "https://gw.m-ld.org"},
        } as MeldIoConfig)
            .then(async (peer) => {
                await peer.read(
                    async (state) => {
                        const existingProfile = await state.get(domainId);
                        setProfile(existingProfile);
                    },
                    async (_update, state) => {
                        const updatedProfile = await state.get(domainId);
                        setProfile(updatedProfile);
                    }
                );
                setPeer(peer);
            })
            .catch(setError);
    }, [domainId, domainUrl]);

    if (!profile && !error) return <div className={styles.container}><Loading/></div>

    const onSubmit = async (data: FormData) => {
        setError(null);
        if (!peer || !domainId) return;
        try {
            await peer.delete(domainId);
            await peer.write({
                "@id": domainId,
                [FOAF.name.value]: data.name,
            })
        } catch (error) {
            setError(extractError(error, "Error when updating name"));
        }
    }

    const name = profile?.[FOAF.name.value]?.toString() || "";

    return error
        ? <div className={styles.container}>
            <ErrorMessage error={error}/>
            <Content>Apologies, something went wrong. Try to reload the demo by pressing the button below.</Content>
            <button className="button" onClick={() => location.reload()}>Reload demo</button>
        </div>
        : <Demo className={styles.container} name={name} onSubmit={onSubmit} noNotify={true}/>
}