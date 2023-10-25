import LDOLocalDemo from "./local-demo";
import IntroSection from "./intro.mdx";
import LocalCodeSection from "./local-demo/code.mdx";
import SolidReactCodeSection from "./solid-react-demo/code.mdx";
import Content from "../content";
import LDOSolidReactDemo from "./solid-react-demo";
import Review from "./review.mdx";
import LogoutButton from "../logout-button";
import Login from "../login";
import {useSolidAuth} from "@ldo/solid-react";
import {LIBRARY_LDO} from "../../constants.ts";
import LibraryLayout from "../library-layout";

export default function LDO() {
    const {login, session} = useSolidAuth();
    return (
        <LibraryLayout library={LIBRARY_LDO}>
            <IntroSection/>
            <div id="local">
                <Content><h2 className="subtitle is-3">Local demo</h2></Content>
                <LDOLocalDemo/>
                <LocalCodeSection/>
            </div>
            <div id="solid-react">
                <Content><h2 className="subtitle is-3">@ldo/solid-react demo</h2></Content>
                {session.isLoggedIn ? <>
                    <LDOSolidReactDemo/>
                    <LogoutButton/>
                </> : <Login login={(issuer) => login(issuer, {redirectUrl: location.href.replace(/#\S+$/, "")})}/>}
                <SolidReactCodeSection/>
            </div>
            <Review/>
        </LibraryLayout>
    )
}