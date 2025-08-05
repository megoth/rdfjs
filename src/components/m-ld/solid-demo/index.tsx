import {useLayoutEffect, useMemo, useState} from "react";
import Loading from "../../loading";
import {clone, uuid} from '@m-ld/m-ld';
import {MemoryLevel} from 'memory-level';
import {IoRemotes, MeldIoConfig} from "@m-ld/m-ld/ext/socket.io";
import useNotification from "../../../hooks/use-notification";
import {useLdo, useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import MLdInitStep from "../init-step";
import MLdDemo from "../demo";
import {FOAF} from "../../../namespaces.ts";
import {simpleSolidProfileShapeType} from "../../../../.ldo/solidProfile.shapeTypes";

export default function MldSolidDemo() {
    const {session: {webId}} = useSolidAuth();
    const {commitData, changeData, createData} = useLdo();
    const profileResource = useResource(webId, {reloadOnMount: true});
    const profile = useSubject(simpleSolidProfileShapeType, webId);
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
                    [FOAF.name.value]: profile.name,
                }),
                peer.read(
                    () => undefined,
                    async (_update, state) => {
                        setError(null);
                        if (!webId || !profileResource) return setError(new Error("Unable to load profile"));
                        const p2pProfile = await state.get(domainId)
                        const oldProfile = profile || createData(simpleSolidProfileShapeType, webId);
                        const updatedProfile = changeData(oldProfile, profileResource);
                        updatedProfile.name = p2pProfile?.[FOAF.name.value] as string;
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

    return <MLdDemo domainId={domainId} error={error} />
}