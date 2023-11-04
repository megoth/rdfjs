import {useSolidAuth} from "@ldo/solid-react";
import Box from "../box";
import Login from "../login";
import {HTMLAttributes, ReactNode} from "react";

interface Props extends HTMLAttributes<HTMLDivElement>{
    children: ReactNode
    redirectId?: string
}

export default function LoginGate({children, redirectId, ...props}: Props) {
    const {session, login} = useSolidAuth();
    return session.isLoggedIn ? children : (
        <Box {...props}>
            <Login login={login} redirectId={redirectId}/>
        </Box>
    );
}