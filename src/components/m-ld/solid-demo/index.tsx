import {useLayoutEffect, useMemo, useState} from "react";
import Loading from "../../loading";
import {clone, uuid} from '@m-ld/m-ld';
import {MemoryLevel} from 'memory-level';
import {IoRemotes, MeldIoConfig} from "@m-ld/m-ld/ext/socket.io";
import styles from "./styles.module.css";
import ErrorMessage from "../../error-message";
import useNotification from "../../../hooks/use-notification";
import {useLdo, useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import {SolidProfileShapeType} from "ldo-solid-profile";
import MLdInitStep from "../init-step";

export default function MldSolidDemo() {
    const {session: {webId}} = useSolidAuth();
    const {commitData, changeData, createData} = useLdo();
    const profileResource = useResource(webId, {reloadOnMount: true});
    const profile = useSubject(SolidProfileShapeType, webId);
    const domainId = useMemo(() => uuid(), []);
    const domainUrl = useMemo(() => `${domainId}.public.gw.m-ld.org`, [domainId]);
    const [init, setInit] = useState<boolean>(false);
    const [peerLoaded, setPeerLoaded] = useState<boolean>(false);
    const {notify} = useNotification()
    const [error, setError] = useState<Error | null>(null);

    useLayoutEffect(() => {
        if (!webId || !profileResource || profileResource.isLoading() || !init) return;
        if (!profile) return setError(new Error("Unable to load profile"));

        clone(new MemoryLevel(), IoRemotes, {
            '@id': webId,
            '@domain': domainUrl,
            genesis: true,
            io: {uri: "https://gw.m-ld.org"},
        } as MeldIoConfig)
            .then((peer) => Promise.all([
                peer.write({
                    "@id": domainId,
                    "name": profile.name,
                }),
                peer.read(
                    () => undefined,
                    async (_update, state) => {
                        setError(null);
                        const p2pProfile = await state.get(domainId)
                        if (!webId || !profileResource) return;
                        const oldProfile = profile || createData(SolidProfileShapeType, webId);
                        const updatedProfile = changeData(oldProfile, profileResource);
                        updatedProfile.name = p2pProfile?.name as string;
                        await commitData(updatedProfile).catch(setError);
                        if (updatedProfile.name) notify(<>Name updated: <strong>{updatedProfile.name}</strong></>);
                    },
                )
            ]))
            .then(() => setPeerLoaded(true))
            .catch(setError);
    }, [changeData, commitData, createData, domainId, domainUrl, init, notify, profile, profileResource, webId]);

    if (!init) return <MLdInitStep onClick={() => setInit(true)}/>

    if (!peerLoaded && !error) return <Loading/>

    return error
        ? <ErrorMessage error={error}/>
        : <div className={styles.container}>
            <iframe src={`/m-ld/${domainId}`}/>
            <iframe src={`/m-ld/${domainId}`}/>
        </div>
}