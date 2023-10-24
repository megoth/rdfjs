import demoCode from "./demo/index.tsx?raw";
import Code from "../code";
import IntroSection from "./intro.mdx";
import CodeSection from "./code.mdx";
import Content from "../content";
import ComunicaDemo from "./demo";
import {useSolidAuth} from "@ldo/solid-react";
import LogoutButton from "../logout-button";
import Login from "../login";
import Review from "./review.mdx";
import {LIBRARY_COMUNICA} from "../../constants.ts";
import LibraryLayout from "../library-layout";

export default function Comunica() {
    const {login, session} = useSolidAuth();

    return (
        <LibraryLayout library={LIBRARY_COMUNICA}>
            <Content><IntroSection/></Content>
            <div id="solid">
                <Content><h2 className="subtitle is-3">Solid demo</h2></Content>
                {session.isLoggedIn ? <>
                    <ComunicaDemo/>
                    <LogoutButton/>
                </> : <Login login={login}/>}
                <Content><CodeSection/></Content>
                <Code language={"tsx"} id="ComunicaSolidDemo" code={demoCode}/>
            </div>
            <Review/>
        </LibraryLayout>
    )
}