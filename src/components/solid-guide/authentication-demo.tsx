import {useSolidAuth} from "@ldo/solid-react";
import Content from "../content";
import Login from "../login";

export default function AuthenticationDemo() {
    const {login, logout, session} = useSolidAuth();

    return <Content>
        {session.isLoggedIn
            ? <>
                <p>You're authenticated with <a href={session.webId}>{session.webId}</a></p>
                <button className="button is-small" onClick={logout}>Log out</button>
            </>
            : <>
                <p>You're not authenticated</p>
                <Login login={login}/>
            </>}
    </Content>
}