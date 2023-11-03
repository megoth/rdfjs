import {useSolidAuth} from "@ldo/solid-react";
import Login from "../login";

export default function AuthenticationDemo() {
    const {login, logout, session: {isLoggedIn, webId}} = useSolidAuth();

    return isLoggedIn
        ? <>
            <div className="notification is-success is-light">
                You're authenticated with <a href={webId}>{webId}</a>
            </div>
            <button className="button" onClick={logout}>Log out</button>
        </>
        : <>
            <div className="notification is-danger is-light">
                You're not authenticated
            </div>
            <Login login={login}/>
        </>
}