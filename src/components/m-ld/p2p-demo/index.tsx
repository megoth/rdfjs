import {useEffect, useMemo, useState} from "react";
import Loading from "../../loading";
import {clone, uuid} from '@m-ld/m-ld';
import {MemoryLevel} from 'memory-level';
import {IoRemotes} from "@m-ld/m-ld/ext/socket.io";
import styles from "./styles.module.css";
import ErrorMessage from "../../error-message";
import useNotification from "../../../hooks/use-notification";
import {BASE_CONFIG} from "../constants.ts";
import MLdInitStep from "../init-step";

export default function MldP2PDemo() {
    const [error, setError] = useState<Error | null>(null);
    const domainId = useMemo(() => uuid(), []);
    const domainUrl = useMemo(() => `${domainId}.public.gw.m-ld.org`, [domainId]);
    const [peerLoaded, setPeerLoaded] = useState<boolean>(false);
    const {notify} = useNotification();
    const [init, setInit] = useState<boolean>(false);

    useEffect(() => {
        clone(new MemoryLevel(), IoRemotes, {
            ...BASE_CONFIG,
            '@id': domainId,
            '@domain': domainUrl,
            genesis: true,
        })
            .then((peer) => Promise.all([
                peer.write({
                    "@id": domainId,
                    "name": "P2P test",
                }),
                peer.read(
                    () => undefined,
                    (_update, state) => state.get(domainId).then(async (profile) => {
                        const name = profile?.name as string;
                        if (name) notify(<>Name updated: <strong>{name}</strong></>);
                    }),
                )
            ]))
            .then(() => setPeerLoaded(true))
            .catch(setError);
    }, [domainId, domainUrl, notify]);

    if (!init) {
        return <MLdInitStep setInit={setInit} />
    }

    if (!peerLoaded && !error) return <Loading/>

    return error
        ? <ErrorMessage error={error}/>
        : <div className={styles.container}>
            <iframe src={`/m-ld/${domainId}`}/>
            <iframe src={`/m-ld/${domainId}`}/>
        </div>
}