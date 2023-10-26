import CodeSection from "./demo/code.mdx";
import Content from "../content";
import ComunicaDemo from "./demo";
import LogoutButton from "../logout-button";
import Intro from "./1-intro.mdx";
import Review from "./2-review.mdx";
import {LIBRARY_COMUNICA} from "../../constants.ts";
import LibraryLayout from "../library-layout";
import LoginGate from "../login-gate";

export default function Comunica() {
    return (
        <LibraryLayout library={LIBRARY_COMUNICA}>
            <Intro/>
            <Content id="solid">
                <h2 className="subtitle">Solid demo</h2>
            </Content>
            <LoginGate redirectId="solid">
                <ComunicaDemo/>
                <LogoutButton/>
            </LoginGate>
            <CodeSection/>
            <Review/>
        </LibraryLayout>
    )
}