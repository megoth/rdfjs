import {useCallback, useEffect, useMemo, useState} from "react";
import Loading from "../../loading";
import {clone, MeldConfig, MeldReadState, uuid} from '@m-ld/m-ld';
import {MemoryLevel} from 'memory-level';
import {IoRemotes} from "@m-ld/m-ld/ext/socket.io";
import styles from "./styles.module.css";
import ErrorMessage from "../../error-message";
import useNotification from "../../../hooks/use-notification";
import {baseConfig} from "./constants.ts";

export default function MLdSolidDemo() {
    const [error, setError] = useState<Error | null>(null);
    const domainId = useMemo(() => uuid(), []);
    const domainUrl = useMemo(() => `${domainId}.public.gw.m-ld.org`, [domainId]);
    const config = useMemo(() => ({
        ...baseConfig,
        '@id': domainId,
        '@domain': domainUrl,
        genesis: true,
    }) as MeldConfig, [domainId, domainUrl]);
    const [peerLoaded, setPeerLoaded] = useState<boolean>(false);
    const {notify} = useNotification()

    const notifyName = useCallback((state: MeldReadState) => state.get(domainId).then(async (profile) => {
        const name = profile?.name as string;
        if (name) notify(<>Name updated: <strong>{name}</strong></>);
    }), [domainId]); // DO NOT ADD notify AS dependency

    useEffect(() => {
        clone(new MemoryLevel(), IoRemotes, config)
            .then((peer) => Promise.all([
                peer.write({
                    "@id": domainId,
                    "name": "P2P test",
                }),
                peer.read(
                    notifyName,
                    (_update, state) => notifyName(state),
                )
            ]))
            .then(() => setPeerLoaded(true))
            .catch(setError);
    }, [config, domainId, domainUrl, notifyName]);

    if (!peerLoaded && !error) return <Loading/>

    return error
        ? <ErrorMessage error={error}/>
        : <div className={styles.container}>
            <iframe src={`/m-ld/${domainId}`}/>
            <iframe src={`/m-ld/${domainId}`}/>
        </div>
}
