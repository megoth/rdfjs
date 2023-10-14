import Login from "../login";
import InruptDemo from "./demo";
import {useSolidAuth} from "@ldo/solid-react";
import Code from "../code";
import demoCode from "./demo/index.tsx?raw";
import IntroSection from "./intro.mdx";
import CodeSection from "./code.mdx";
import Content from "../content";
import usePrism from "../../hooks/use-prism";
import LogoutButton from "../logout-button";

export default function Inrupt() {
    const {login, session} = useSolidAuth();
    usePrism();

    return (
        <>
            <h1 className="title">Inrupt’s JavaScript client libraries</h1>
            <Content><IntroSection/></Content>
            {session.isLoggedIn ? <>
                <InruptDemo/>
                <LogoutButton/>
            </> : <Login login={login}/>}
            <Content><CodeSection/></Content>
            <Code language={"tsx"}>{demoCode}</Code>
        </>
    )
}