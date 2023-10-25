import {useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import Login from "../login";
import {SolidProfileShapeType} from "ldo-solid-profile";
import Loading from "../loading";
import LogoutButton from "../logout-button";
import Content from "../content";

export default function SolidWarning() {
    const {session, login} = useSolidAuth();
    useResource(session.webId, {reloadOnMount: true});
    const profile = useSubject(SolidProfileShapeType, session.webId);

    return session.isLoggedIn ? (
            profile?.name ?
                <>
                        <Content>
                            <p>
                                Thank you, <strong>{profile?.name || "Stranger"}</strong>, you're all good!
                                (Thanks for trusting me btw, I won't abuse that trust.)
                            </p>
                        </Content>
                        <LogoutButton/>
                </> :
                <Loading/>
        ) :
        <>
                <Content>
                    <p>
                        The Solid demos allow you to change the name described in your WebID profile. This means the app
                        will need at least <strong>READ</strong> and <strong>APPEND</strong> access to your WebID
                        resource. The latter access mode provides a lot of possibilities for an app with malicious
                        intent. Although I can promise I won't betray that trust (and I do, pinky promise!), you
                        might want to consider using this app (and other experimental apps like it) with a WebID that
                        isn't vulnerable (e.g. use a test account).
                    </p>

                    <p>If you want, you can log in here, to verify that everything connects as it should.</p>
                </Content>
                <Login login={login} className="is-small"/>
        </>
}