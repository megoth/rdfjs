import {useSolidAuth} from "@ldo/solid-react";
import Box from "../box";
import Login from "../login";
import {ReactNode} from "react";

interface Props {
    children: ReactNode
    redirectId?: string
}

export default function LoginGate({children, redirectId}: Props) {
    const {session, login} = useSolidAuth();
    return session.isLoggedIn ? children : (
        <Box>
            <Login login={login} redirectId={redirectId}/>
        </Box>
    );
}