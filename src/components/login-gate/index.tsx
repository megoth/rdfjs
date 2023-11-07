import {useSolidAuth} from "@ldo/solid-react";
import Box from "../box";
import Login from "../login";
import {HTMLAttributes, ReactNode} from "react";
import {Provider} from "../../constants.tsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    providers?: Array<Provider>
    redirectId?: string
}

export default function LoginGate({children, providers, redirectId, ...props}: Props) {
    const {login, session: {isLoggedIn}} = useSolidAuth();

    // useEffect(() => {
    //     if (!webId) return;
    //     console.log("WEBID", webId)
    //
    //     getAccessApiEndpoint(webId, {fetch}).then(async (accessGrantUrl) => {
    //         const myAccessGrantVC = await getAccessGrantFromRedirectUrl(accessGrantUrl, {fetch});
    //         console.log(myAccessGrantVC);
    //     })
    //
    //     // issueAccessRequest({
    //     //     access: {read: true, write: true},
    //     //     resources: [webId],
    //     //     resourceOwner: webId,
    //     // }, {fetch})
    //     //     .then((requestVC) => {
    //     //         console.log("REQUEST", requestVC);
    //     //     })
    //     //     .catch((error) => {
    //     //         console.error("OH MY AN ERROR", error);
    //     //     });
    // }, [fetch, webId]);

    return isLoggedIn ? children : (
        <Box {...props}>
            <Login login={login} redirectId={redirectId} providers={providers}/>
        </Box>
    );
}