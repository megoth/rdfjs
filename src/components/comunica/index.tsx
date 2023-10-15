import demoCode from "./demo/index.tsx?raw";
import Code from "../code";
import IntroSection from "./intro.mdx";
import CodeSection from "./code.mdx";
import Content from "../content";
import ComunicaDemo from "./demo";
import {useSolidAuth} from "@ldo/solid-react";
import usePrism from "../../hooks/use-prism";
import LogoutButton from "../logout-button";
import Login from "../login";
import Review from "./review.mdx";

export default function Comunica() {
    const {login, session} = useSolidAuth();
    usePrism();

    return (
        <>
            <h1 className="title">Comunica</h1>
            <Content><IntroSection/></Content>
            <div id="solid">
                {session.isLoggedIn ? <>
                    <ComunicaDemo/>
                    <LogoutButton/>
                </> : <Login login={login}/>}
                <Content><CodeSection/></Content>
                <Code language={"tsx"}>{demoCode}</Code>
            </div>
            <Review/>
        </>
    )
}