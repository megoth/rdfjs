import {useSolidAuth} from "@ldo/solid-react";
import Login from "../login";
import {HTMLAttributes} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
}

export default function AuthenticationDemo({id, ...props}: Props) {
    const {login, logout, session: {isLoggedIn, webId}} = useSolidAuth();

    return isLoggedIn
        ? <div id={id} {...props}>
            <div className="notification is-success is-light" style={{overflow: "auto"}}>
                <span>You're authenticated with </span>
                <a href={webId}>{webId}</a>
            </div>
            <button className="button" onClick={logout}>Log out</button>
        </div>
        : <div id={id} {...props}>
            <div className="notification is-danger is-light">
                You're not authenticated
            </div>
            <Login login={login} redirectId={id}/>
        </div>
}