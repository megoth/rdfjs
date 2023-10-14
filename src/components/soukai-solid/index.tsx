import Login from "../login";
import {useSolidAuth} from "@ldo/solid-react";
import SoukaiSolidDemo from "./demo";

export default function SoukaiSolid() {
    const {login, logout, session} = useSolidAuth();

    return (
        <>
            <h1 className="title">Soukai Solid</h1>
            {session.isLoggedIn ? <>
                <SoukaiSolidDemo/>
                <button className="button is-small" onClick={() => logout()}>Log out</button>
            </> : <Login login={login}/>}
        </>
    );
}