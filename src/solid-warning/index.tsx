import {useSolidAuth} from "@ldo/solid-react";
import Login from "../login";

export default function SolidWarning() {
    const {session, login, logout} = useSolidAuth();

    return <>
        <h3 className={"subtitle is-4"}>A note on Solid</h3>
        {session.isLoggedIn ? <>
            <div className="message is-success">
                <div className="message-body">You're all good! (Thanks for trusting us, we won't abuse that trust.)</div>
            </div>
            <button className="button is-small" onClick={logout}>Log out</button>
        </> : <>
            <div className="message is-warning">
                <div className="message-body">
                    For the demo we will need at least <strong>READ</strong> and <strong>APPEND</strong> access to
                    your WebID resource. Even this provides an app with a lot of possibilities for malicious intent.
                    So to be sure you should test this app with WebID that isn't vulnerable (e.g. use a test
                    account).
                </div>
            </div>
            <p>If you want, you can log in here, to verify that everything connects as it should.</p>
            <Login login={login}/>
        </>}
    </>;
}