import Login from "../login";
import InruptLocalDemo from "./local-demo";
import InruptSolidDemo from "./solid-demo";
import {useSolidAuth} from "@ldo/solid-react";
import Intro from "./1-intro.mdx";
import LocalDemoCode from "./local-demo/code.mdx";
import SolidDemoCode from "./solid-demo/code.mdx";
import Content from "../content";
import LogoutButton from "../logout-button";
import Review from "./review.mdx";
import {LIBRARY_INRUPT} from "../../constants.ts";
import LibraryLayout from "../library-layout";
import Box from "../box";

export default function Inrupt() {
    const {login, session} = useSolidAuth();
    return (
        <LibraryLayout library={LIBRARY_INRUPT}>
            <Intro/>
            <Content id="local"><h2 className="subtitle is-3">Local demo</h2></Content>
            <InruptLocalDemo/>
            <LocalDemoCode/>
            <Content id="solid"><h2 className="subtitle is-3">Solid demo</h2></Content>
            {session.isLoggedIn ? <>
                <InruptSolidDemo/>
                <LogoutButton/>
            </> : <Box>
                <Login login={(issuer) => login(issuer, {redirectUrl: location.href.replace(/#\S+$/, "")})}/>
            </Box>}
            <SolidDemoCode/>
            <Review/>
        </LibraryLayout>
    )
}