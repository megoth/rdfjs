import RdflibSolidDemo from "./demo";
import Login from "../login";
import {useSolidAuth} from "@ldo/solid-react";
import Code from "../code";
import demoCode from "./demo/index.tsx?raw";

export default function RdflibSolid() {
    const {login, logout, session} = useSolidAuth();

    return <>
        <h1 className="title">rdflib.js with Solid</h1>
        {session.isLoggedIn ? <>
            <RdflibSolidDemo/>
            <button className="button is-small" onClick={logout}>Log out</button>
        </> : <Login login={login}/>}
        <Code language={"tsx"}>{demoCode}</Code>
    </>
}