import Login from "../login";
import {useSolidAuth} from "@ldo/solid-react";
import LDOSolidReactDemo from "./demo";

export default function LDOSolidReact() {
    const {login, logout, session} = useSolidAuth();

    return (
        <>
            <h1 className="title">LDO (Linked Data Objects)</h1>
            {session.isLoggedIn ? <>
                <LDOSolidReactDemo/>
                <button className="button is-small" onClick={() => logout()}>Log out</button>
            </> : <Login login={login}/>}
        </>
    );
}