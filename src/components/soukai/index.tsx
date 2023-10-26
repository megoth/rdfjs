import SoukaiLocalDemo from "./local-demo";
import Intro from "./1-intro.mdx";
import Models from "./2-models.mdx";
import Review from "./3-review.mdx";
import LocalCodeSection from "./local-demo/code.mdx";
import SolidCodeSection from "./solid-demo/code.mdx";
import Content from "../content";
import LogoutButton from "../logout-button";
import SoukaiSolidDemo from "./solid-demo";
import {LIBRARY_SOUKAI} from "../../constants.ts";
import LibraryLayout from "../library-layout";
import LoginGate from "../login-gate";

export default function Soukai() {
    return (
        <LibraryLayout library={LIBRARY_SOUKAI}>
            <Intro/>
            <Models />
            <Content id="local">
                <h2 className="subtitle is-3">Local demo</h2>
            </Content>
            <SoukaiLocalDemo/>
            <LocalCodeSection/>
            <Content id="solid">
                <h2 className="subtitle is-3">Solid demo</h2>
            </Content>
            <LoginGate redirectId="solid">
                <SoukaiSolidDemo/>
                <LogoutButton/>
            </LoginGate>
            <SolidCodeSection/>
            <Review/>
        </LibraryLayout>
    )
}