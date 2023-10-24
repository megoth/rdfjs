import SoukaiLocalDemo from "./local-demo";
import Code from "../code";
import localDemoCode from "./local-demo/index.tsx?raw";
import solidDemoCode from "./solid-demo/index.tsx?raw";
import IntroSection from "./intro.mdx";
import LocalCodeSection from "./local-demo/code.mdx";
import SolidCodeSection from "./solid-demo/code.mdx";
import Content from "../content";
import LogoutButton from "../logout-button";
import Login from "../login";
import {useSolidAuth} from "@ldo/solid-react";
import SoukaiSolidDemo from "./solid-demo";
import Review from "./review.mdx";
import {LIBRARY_SOUKAI} from "../../constants.ts";
import LibraryLayout from "../library-layout";

export default function Soukai() {
    const {login, session} = useSolidAuth();
    return (
        <LibraryLayout library={LIBRARY_SOUKAI}>
            <Content><IntroSection/></Content>
            <div id="local">
                <h2 className="subtitle is-3">Local demo</h2>
                <SoukaiLocalDemo/>
                <Content><LocalCodeSection/></Content>
                <Code language="tsx" id="SoukaiLocalDemo" code={localDemoCode} className="line-numbers" />
            </div>
            <div id="solid">
                <Content><h2 className="subtitle is-3">Solid demo</h2></Content>
                {session.isLoggedIn ? <>
                    <SoukaiSolidDemo/>
                    <LogoutButton/>
                </> : <Login login={(issuer) => login(issuer, {redirectUrl: location.href.replace(/#\S+$/, "")})}/>}
                <Content><SolidCodeSection/></Content>
                <Code language={"tsx"} id="SoukaiSolidDemo" code={solidDemoCode} />
            </div>
            <Review/>
        </LibraryLayout>
    )
}