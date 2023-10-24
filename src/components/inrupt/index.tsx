import Login from "../login";
import InruptLocalDemo from "./local-demo";
import InruptSolidDemo from "./solid-demo";
import {useSolidAuth} from "@ldo/solid-react";
import IntroSection from "./intro.mdx";
import LocalCodeSection from "./local-demo/code.mdx";
import SolidCodeSection from "./solid-demo/code.mdx";
import Content from "../content";
import LogoutButton from "../logout-button";
import Review from "./review.mdx";
import {LIBRARY_INRUPT} from "../../constants.ts";
import LibraryLayout from "../library-layout";

export default function Inrupt() {
    const {login, session} = useSolidAuth();
    return (
        <LibraryLayout library={LIBRARY_INRUPT}>
            <IntroSection/>
            <div id="local">
                <Content><h2 className="subtitle is-3">Local demo</h2></Content>
                <InruptLocalDemo/>
                <LocalCodeSection/>
            </div>
            <div id="solid">
                <Content><h2 className="subtitle is-3">Solid demo</h2></Content>
                {session.isLoggedIn ? <>
                    <InruptSolidDemo/>
                    <LogoutButton/>
                </> : <Login login={login}/>}
                <SolidCodeSection/>
            </div>
            <Review/>
        </LibraryLayout>
    )
}