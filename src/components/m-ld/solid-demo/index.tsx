import {useEffect, useMemo, useState} from "react";
import Loading from "../../loading";
import {clone, uuid} from '@m-ld/m-ld';
import {MemoryLevel} from 'memory-level';
import {IoRemotes} from "@m-ld/m-ld/ext/socket.io";
import styles from "./styles.module.css";
import ErrorMessage from "../../error-message";
import useNotification from "../../../hooks/use-notification";
import {BASE_CONFIG} from "../constants.ts";
import {useLdo, useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import {SolidProfileShapeType} from "ldo-solid-profile";

export default function MldSolidDemo() {
    const {session: {webId}} = useSolidAuth();
    const {commitData, changeData, createData} = useLdo();
    const profileResource = useResource(webId, {reloadOnMount: true});
    const profile = useSubject(SolidProfileShapeType, webId);
    const [error, setError] = useState<Error | null>(null);
    const domainId = useMemo(() => uuid(), []);
    const domainUrl = useMemo(() => `${domainId}.public.gw.m-ld.org`, [domainId]);
    const [peerLoaded, setPeerLoaded] = useState<boolean>(false);
    const {notify} = useNotification()
    const [init, setInit] = useState<boolean>(false);

    useEffect(() => {
        if (!profileResource || profileResource.isLoading()) return;
        if (!profile) {
            setError(new Error("Unable to load profile"));
            return;
        }
        clone(new MemoryLevel(), IoRemotes, {
            ...BASE_CONFIG,
            '@id': domainId,
            '@domain': domainUrl,
            genesis: true,
        })
            .then((peer) => Promise.all([
                peer.write({
                    "@id": domainId,
                    "name": profile.name,
                }),
                peer.read(
                    () => undefined,
                    (_update, state) => state.get(domainId).then(async (p2pProfile) => {
                        setError(null);
                        if (!webId || !profileResource) return;
                        const oldProfile = profile || createData(SolidProfileShapeType, webId);
                        const updatedProfile = changeData(oldProfile, profileResource);
                        updatedProfile.name = p2pProfile?.name as string;
                        await commitData(updatedProfile).catch(setError);
                        if (updatedProfile.name) notify(<>Name updated: <strong>{updatedProfile.name}</strong></>);
                    }),
                )
            ]))
            .then(() => setPeerLoaded(true))
            .catch(setError);
    }, [changeData, commitData, createData, domainId, domainUrl, notify, profile, profileResource, webId]);

    if (!init) return <button className="button is-large" onClick={() => setInit(true)}>Start demo</button>

    if (!peerLoaded && !error) return <Loading/>

    return error
        ? <ErrorMessage error={error}/>
        : <div className={styles.container}>
            <iframe src={`/m-ld/${domainId}`}/>
            <iframe src={`/m-ld/${domainId}`}/>
        </div>
}