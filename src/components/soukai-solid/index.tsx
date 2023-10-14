import Login from "../login";
import {useSolidAuth} from "@ldo/solid-react";
import SoukaiSolidDemo from "./demo";
import Code from "../code";
import demoCode from "./demo/index.tsx?raw";

export default function SoukaiSolid() {
    const {login, logout, session} = useSolidAuth();

    return (
        <>
            <h1 className="title">Soukai Solid</h1>
            {session.isLoggedIn ? <>
                <SoukaiSolidDemo/>
                <button className="button is-small" onClick={() => logout()}>Log out</button>
            </> : <Login login={login}/>}
            <Code language={"tsx"}>{demoCode}</Code>
        </>
    );
}