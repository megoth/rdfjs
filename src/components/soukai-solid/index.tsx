import Login from "../login";
import {useSolidAuth} from "@ldo/solid-react";
import SoukaiSolidDemo from "./demo";
import Code from "../code";
import demoCode from "./demo/index.tsx?raw";
import IntroSection from "./intro.mdx";
import CodeSection from "./code.mdx";
import Content from "../content";
import usePrism from "../../hooks/use-prism";
import LogoutButton from "../logout-button";

export default function SoukaiSolid() {
    usePrism();
    const {login, session} = useSolidAuth();

    return (
        <>
            <h1 className="title">Soukai Solid</h1>
            <Content><IntroSection/></Content>
            {session.isLoggedIn ? <>
                <SoukaiSolidDemo/>
                <LogoutButton/>
            </> : <Login login={login}/>}
            <Content><CodeSection/></Content>
            <Code language={"tsx"}>{demoCode}</Code>
        </>
    );
}