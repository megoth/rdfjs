import Login from "../login";
import {useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import {getName, SolidProfileShapeType} from "ldo-solid-profile";
import Loading from "../loading";

export default function LDOSolidReact() {
    const {login, logout, session} = useSolidAuth();
    const profileResource = useResource(session.webId);
    const profile = useSubject(SolidProfileShapeType, session.webId);

    if (profileResource?.isLoading()) {
        return <Loading/>
    }

    return (
        <>
            <h1 className="title">LDO (Linked Data Objects)</h1>
            {session.isLoggedIn ? (
                <div style={{display: "flex", gap: "0.5em", alignItems: "center"}}>
                    <div>Howdy, {profile ? getName(profile) : "Stranger"}</div>
                    <button className="button is-small" onClick={() => logout()}>Log out</button>
                </div>
            ) : <Login login={login}/>}
        </>
    );
}