import Login from "../login";
import InruptLocalDemo from "./local-demo";
import InruptSolidDemo from "./solid-demo";
import {useSolidAuth} from "@ldo/solid-react";
import Code from "../code";
import localDemoCode from "./local-demo/index.tsx?raw";
import solidDemoCode from "./solid-demo/index.tsx?raw";
import IntroSection from "./intro.mdx";
import LocalCodeSection from "./local-demo/code.mdx";
import SolidCodeSection from "./solid-demo/code.mdx";
import Content from "../content";
import LogoutButton from "../logout-button";
import Review from "./review.mdx";
import LibraryHeader from "../library-header";
import {LIBRARY_INRUPT} from "../../constants.ts";

export default function Inrupt() {
    const {login, session} = useSolidAuth();
    return (
        <>
            <LibraryHeader library={LIBRARY_INRUPT}/>
            <Content><IntroSection/></Content>
            <div id="local">
                <h2 className="subtitle is-3">Local demo</h2>
                <InruptLocalDemo/>
                <Content><LocalCodeSection/></Content>
                <Code language={"tsx"} id="InruptLocalDemo" code={localDemoCode}/>
            </div>
            <div id="solid">
                <h2 className="subtitle is-3">Solid demo</h2>
                {session.isLoggedIn ? <>
                    <InruptSolidDemo/>
                    <LogoutButton/>
                </> : <Login login={login}/>}
                <Content><SolidCodeSection/></Content>
                <Code language={"tsx"} id="InruptSolidDemo" code={solidDemoCode}/>
            </div>
            <Review/>
        </>
    )
}