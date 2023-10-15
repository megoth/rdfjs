import SoukaiDemo from "./local-demo";
import Code from "../code";
import localDemoCode from "./local-demo/index.tsx?raw";
import solidDemoCode from "./solid-demo/index.tsx?raw";
import IntroSection from "./intro.mdx";
import LocalCodeSection from "./local-demo/code.mdx";
import SolidCodeSection from "./solid-demo/code.mdx";
import Content from "../content";
import LogoutButton from "../logout-button";
import Login from "../login";
import usePrism from "../../hooks/use-prism";
import {useSolidAuth} from "@ldo/solid-react";
import SoukaiSolidDemo from "./solid-demo";

export default function Soukai() {
    usePrism();
    const {login, session} = useSolidAuth();
    return (
        <>
            <h1 className="title">Soukai</h1>
            <Content><IntroSection/></Content>
            <div id="local">
                <h2 className="subtitle is-3">Local demo</h2>
                <SoukaiDemo/>
                <Content><LocalCodeSection/></Content>
                <Code language={"tsx"}>{localDemoCode}</Code>
            </div>
            <div id="solid">
                <h2 className="subtitle is-3">Solid demo</h2>
                {session.isLoggedIn ? <>
                    <SoukaiSolidDemo/>
                    <LogoutButton/>
                </> : <Login login={(issuer) => login(issuer, { redirectUrl: location.href.replace(/#\S+$/, "")})}/>}
                <Content><SolidCodeSection/></Content>
                <Code language={"tsx"}>{solidDemoCode}</Code>
            </div>
        </>
    )
}