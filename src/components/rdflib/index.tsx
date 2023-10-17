import RdflibLocalDemo from "./local-demo";
import localDemoCode from "./local-demo/index.tsx?raw";
import solidDemoCode from "./solid-demo/index.tsx?raw";
import Code from "../code";
import IntroSection from "./intro.mdx";
import LocalDemoCodeSection from "./local-demo/code.mdx";
import SolidDemoCodeSection from "./solid-demo/code.mdx";
import Content from "../content";
import RdflibSolidDemo from "./solid-demo";
import Review from "./review.mdx";
import LogoutButton from "../logout-button";
import Login from "../login";
import {useSolidAuth} from "@ldo/solid-react";
import LibraryHeader from "../library-header";
import {LIBRARY_RDFLIB} from "../../constants.ts";
import ReviewHeader from "../review-header";

export default function Rdflib() {
    const {login, session} = useSolidAuth();
    return (
        <>
            <LibraryHeader library={LIBRARY_RDFLIB}/>
            <Content><IntroSection/></Content>
            <ReviewHeader library={LIBRARY_RDFLIB}/>
            <div id="local">
                <Code language={"tsx"} id="RdflibLocalDemo" code={localDemoCode}>
                    <h2 className="subtitle is-3">Local demo</h2>
                    <RdflibLocalDemo/>
                    <Content><LocalDemoCodeSection/></Content>
                </Code>
            </div>
            <div id="solid">
                <Code language={"tsx"} id="RdflibSolidDemo" code={solidDemoCode}>
                    <h2 className="subtitle is-3">Solid demo</h2>
                    {session.isLoggedIn ? <>
                        <RdflibSolidDemo/>
                        <LogoutButton/>
                    </> : <Login login={(issuer) => login(issuer, {redirectUrl: location.href.replace(/#\S+$/, "")})}/>}
                    <Content><SolidDemoCodeSection/></Content>
                </Code>
            </div>
            <Review/>
        </>
    )
}