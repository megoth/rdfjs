import LDOLocalDemo from "./local-demo";
import Code from "../code";
import localDemoCode from "./local-demo/index.tsx?raw";
import solidReactDemoCode from "./solid-react-demo/index.tsx?raw";
import IntroSection from "./intro.mdx";
import LocalCodeSection from "./local-demo/code.mdx";
import SolidReactCodeSection from "./solid-react-demo/code.mdx";
import Content from "../content";
import LDOSolidReactDemo from "./solid-react-demo";
import Review from "./review.mdx";
import LogoutButton from "../logout-button";
import Login from "../login";
import {useSolidAuth} from "@ldo/solid-react";
import LibraryHeader from "../library-header";
import {LIBRARY_LDO} from "../../constants.ts";

export default function LDO() {
    const {login, session} = useSolidAuth();
    return (
        <>
            <LibraryHeader library={LIBRARY_LDO}/>
            <Content><IntroSection/></Content>
            <div id="local">
                <Code language={"tsx"} id="LDOLocalDemo" code={localDemoCode}>
                    <h2 className="subtitle is-3">Local demo</h2>
                    <LDOLocalDemo/>
                    <Content><LocalCodeSection/></Content>
                </Code>
            </div>
            <div id="solid-react">
                <Code language={"tsx"} id="LDOSolidDemo" code={solidReactDemoCode}>
                    <h2 className="subtitle is-3">@ldo/solid-react demo</h2>
                    {session.isLoggedIn ? <>
                        <LDOSolidReactDemo/>
                        <LogoutButton/>
                    </> : <Login login={(issuer) => login(issuer, {redirectUrl: location.href.replace(/#\S+$/, "")})}/>}
                    <Content><SolidReactCodeSection/></Content>
                </Code>
            </div>
            <Review/>
        </>
    )
}