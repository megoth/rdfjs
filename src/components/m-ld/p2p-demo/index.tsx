import {useEffect, useMemo, useState} from "react";
import Loading from "../../loading";
import {clone, uuid} from '@m-ld/m-ld';
import {MemoryLevel} from 'memory-level';
import {IoRemotes, MeldIoConfig} from "@m-ld/m-ld/ext/socket.io";
import useNotification from "../../../hooks/use-notification";
import MLdInitStep from "../init-step";
import MLdDemo from "../demo";

export default function MldP2PDemo() {
    const domainId = useMemo(() => uuid(), []);
    const domainUrl = useMemo(() => `${domainId}.public.gw.m-ld.org`, [domainId]);
    const [init, setInit] = useState<boolean>(false);
    const [peerLoaded, setPeerLoaded] = useState<boolean>(false);
    const {notify} = useNotification();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!init) return;
        clone(new MemoryLevel(), IoRemotes, {
            '@id': uuid(),
            '@domain': domainUrl,
            genesis: true,
            io: {uri: "https://gw.m-ld.org"},
        } as MeldIoConfig)
            .then((peer) => Promise.all([
                peer.write({
                    "@id": domainId,
                    "name": "P2P test",
                }),
                peer.read(
                    () => undefined,
                    async (_update, state) => {
                        const profile = await state.get(domainId);
                        const name = profile?.name as string;
                        if (name) notify(<>Name updated: <strong>{name}</strong></>);
                    },
                )
            ]))
            .then(() => setPeerLoaded(true))
            .catch(setError);
    }, [domainId, domainUrl, init, notify]);

    if (!init) return <MLdInitStep onClick={() => setInit(true)}/>

    if (!peerLoaded && !error) return <Loading/>

    return <MLdDemo domainId={domainId} error={error} />
}