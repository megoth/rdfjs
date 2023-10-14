import Login from "../login";
import {useSolidAuth} from "@ldo/solid-react";
import LDOSolidReactDemo from "./demo";
import Code from "../code";
import demoCode from "./demo/index.tsx?raw";
import IntroSection from "./intro.mdx";
import CodeSection from "./code.mdx";
import Content from "../content";
import usePrism from "../../hooks/usePrism";
import LogoutButton from "../logout-button";

export default function LDOSolidReact() {
    usePrism();
    const {login, session} = useSolidAuth();

    return (
        <>
            <h1 className="title">LDO (Linked Data Objects)</h1>
            <Content><IntroSection/></Content>
            {session.isLoggedIn ? <>
                <LDOSolidReactDemo/>
                <LogoutButton/>
            </> : <Login login={login}/>}
            <Content><CodeSection/></Content>
            <Code language={"tsx"}>{demoCode}</Code>
        </>
    );
}