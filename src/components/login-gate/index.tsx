import {useSolidAuth} from "@ldo/solid-react";
import Box from "../box";
import Login from "../login";
import {HTMLAttributes, ReactNode, useEffect} from "react";
import {issueAccessRequest} from "@inrupt/solid-client-access-grants";

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    redirectId?: string
}

export default function LoginGate({children, redirectId, ...props}: Props) {
    const {fetch, login, session: {isLoggedIn, webId}} = useSolidAuth();

    useEffect(() => {
        if (!webId) return;
        console.log("WEBID", webId)

        issueAccessRequest({
            access: {read: true, write: true},
            resources: [webId],
            resourceOwner: webId,
            expirationDate: new Date(Date.now() + 5 * 60000), // expires in 5 minutes
        }, {fetch})
            .then((requestVC) => {
                console.log("REQUEST", requestVC);
            })
            .catch((error) => {
                console.error("OH MY AN ERROR", error);
            });
    }, [fetch, webId]);

    return isLoggedIn ? children : (
        <Box {...props}>
            <Login login={login} redirectId={redirectId}/>
        </Box>
    );
}