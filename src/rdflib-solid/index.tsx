import RdflibSolidDemo from "./demo";
import Login from "../login";
import {useSolidAuth} from "@ldo/solid-react";

export default function RdflibSolid() {
    const {login, logout, session} = useSolidAuth();

    return <>
        <h1 className="title">rdflib.js with Solid</h1>
        {session.isLoggedIn ? <>
            <RdflibSolidDemo/>
            <button className="button is-small" onClick={logout}>Log out</button>
        </> : <Login login={login}/>}
    </>
}