import {useResource, useSolidAuth, useSubject} from "@ldo/solid-react";
import Login from "../login";
import {SolidProfileShapeType} from "ldo-solid-profile";
import Loading from "../loading";
import LogoutButton from "../logout-button";
import Content from "../content";
import {hijackLogin} from "../../libs/location.ts";
import {useHref, useLocation} from "react-router-dom";

export default function SolidWarning() {
    const {session: {isLoggedIn, webId}, login} = useSolidAuth();
    const routerLocation = useLocation();
    useResource(webId, {reloadOnMount: true});
    const profile = useSubject(SolidProfileShapeType, webId);
    const href = useHref(routerLocation.pathname);
    const onLogin = hijackLogin(login, routerLocation, location, href, "SolidWarning");

    return isLoggedIn
        ? profile?.name
            ? <div className="message is-success" id="SolidWarning">
                <div className="message-body">
                    <Content>
                        <p>
                            Thank you, <strong>{profile?.name || "Stranger"}</strong>, you're all good!
                            (Thanks for trusting me btw, I won't abuse that trust.)
                        </p>
                    </Content>
                    <LogoutButton/>
                </div>
            </div>
            : <Loading/>
        : <div className="message is-warning" id="SolidWarning">
            <div className="message-body">
                <Content>
                    <p>
                        The Solid demos allow you to change the name described in your WebID profile. This means the app
                        will need at least <strong>READ</strong> and <strong>WRITE</strong> access to your WebID
                        resource. The latter access mode provides a lot of possibilities for an app with malicious
                        intent. Although I can promise I won't betray that trust (and I do, pinky promise!), you
                        might want to consider using this app (and other experimental apps like it) with a WebID that
                        isn't vulnerable (e.g. use a test account).
                    </p>
                    <p>
                        If you do trust in this website (i.e. me, Arne Hassel, the creator), you can log in here, to
                        verify that everything connects as it should.
                    </p>
                </Content>
                <Login login={onLogin} className="is-warning is-small"/>
            </div>
        </div>
}