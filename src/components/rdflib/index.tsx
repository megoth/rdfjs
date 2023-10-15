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
import usePrism from "../../hooks/use-prism";
import {useSolidAuth} from "@ldo/solid-react";

export default function Rdflib() {
    usePrism();
    const {login, session} = useSolidAuth();
    return (
        <>
            <h1 className="title">rdflib.js</h1>
            <Content><IntroSection/></Content>
            <div id="local">
                <h2 className="subtitle is-3">Local demo</h2>
                <RdflibLocalDemo/>
                <Content><LocalDemoCodeSection/></Content>
                <Code language={"tsx"}>{localDemoCode}</Code>
            </div>
            <div id="solid">
                <h2 className="subtitle is-3">Solid demo</h2>
                {session.isLoggedIn ? <>
                    <RdflibSolidDemo/>
                    <LogoutButton/>
                </> : <Login login={login}/>}
                <Content><SolidDemoCodeSection/></Content>
                <Code language={"tsx"}>{solidDemoCode}</Code>
            </div>
            <Review/>
        </>
    )
}