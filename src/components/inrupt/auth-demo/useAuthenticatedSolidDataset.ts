import {useEffect, useState} from "react";
import {universalAccess, getSolidDataset, SolidDataset, hasResourceInfo, getResourceInfo} from "@inrupt/solid-client";
import {
    getAccessGrantFromRedirectUrl,
    issueAccessRequest,
    redirectToAccessManagementUi,
    saveSolidDatasetAt
} from "@inrupt/solid-client-access-grants";
import {useSolidAuth} from "@ldo/solid-react";


type SaveFunction = (updatedDataset: SolidDataset) => Promise<void>

export default function useAuthenticatedSolidDataset(webId: string | undefined, onError: (error: Error) => void): [SolidDataset | null, SaveFunction] {
    const {fetch} = useSolidAuth();
    const [dataset, setDataset] = useState<SolidDataset | null>(null);

    useEffect(() => {
        if (!webId) return;
        getSolidDataset(webId, {fetch}).then(setDataset);
        // const accessPromise = universalAccess.getAgentAccess(webId, webId, {fetch});
        // if (accessPromise) accessPromise.then((...args) => console.log(args));
        const resourcePromise = getResourceInfo(webId, {fetch});
        if (resourcePromise) {
            resourcePromise.then(async (resourceInfo) => {
                console.log("RESOURCE INFO", resourceInfo);
                const access = await universalAccess.getAgentAccess(webId, webId, {fetch});
                console.log("ACCESS", access)
                const serverResource = await universalAccess.getAclServerResourceInfo(resourceInfo, {fetch});
                console.log("SERVER RESOURCE", serverResource)
                const setModes = await universalAccess.setAgentAccess(webId, webId, { read: true, write: true }, { fetch});
                const accessModes = await universalAccess.getAgentAccess(webId, webId, {fetch});
                console.log("AGENT ACCESS", setModes, accessModes);
                // const requestVC = await issueAccessRequest({
                //     access: {read: true, write: true},
                //     resources: [webId],
                //     resourceOwner: webId,
                // });
                // console.log("REQUEST", requestVC)
            })
        }

        // const serverResource = universalAccess.getAclServerResourceInfo(webId, {fetch});
    }, [fetch, webId]);

    const saveDataset: SaveFunction = async (updatedDataset) => {
        if (!webId) return;
        console.log("ABOUT TO SAVE", webId);
        // 1.
        // const requestVC = await issueAccessRequest({
        //     access: {read: true, write: true},
        //     resources: [webId],
        //     resourceOwner: webId,
        // });
        // console.log("REQUEST", requestVC)
        // await redirectToAccessManagementUi(requestVC.id, location.href);
        // 2.
        const accessGrant = await getAccessGrantFromRedirectUrl(`${webId}?accessGrantUrl=${webId}`, {fetch});
        console.log("ACCESS GRANT", accessGrant);
        return saveSolidDatasetAt(webId, updatedDataset, accessGrant, {fetch})
            .then(setDataset)
            .catch(onError);
    };

    return [dataset, saveDataset]
}