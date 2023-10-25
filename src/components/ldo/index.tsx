import LDOLocalDemo from "./local-demo";
import Intro from "./1-intro.mdx";
import Shapes from "./2-shapes.mdx";
import Review from "./3-review.mdx";
import Bias from "./4-bias.mdx";
import LocalCodeSection from "./local-demo/code.mdx";
import SolidReactCodeSection from "./solid-react-demo/code.mdx";
import Content from "../content";
import LDOSolidReactDemo from "./solid-react-demo";
import LogoutButton from "../logout-button";
import Login from "../login";
import {useSolidAuth} from "@ldo/solid-react";
import {LIBRARY_LDO} from "../../constants.ts";
import LibraryLayout from "../library-layout";
import Box from "../box";

export default function LDO() {
    const {login, session} = useSolidAuth();
    return (
        <LibraryLayout library={LIBRARY_LDO}>
            <Intro/>
            <Shapes />
            <Content id="local">
                <h2 className="subtitle is-3">Local demo</h2>
            </Content>
            <LDOLocalDemo/>
            <LocalCodeSection/>
            <Content id="solid-react">
                <h2 className="subtitle is-3">@ldo/solid-react demo</h2>
            </Content>
            {session.isLoggedIn ? <>
                <LDOSolidReactDemo/>
                <LogoutButton/>
            </> : <Box>
                <Login login={(issuer) => login(issuer, {redirectUrl: location.href.replace(/#\S+$/, "")})}/>
            </Box>}
            <SolidReactCodeSection/>
            <Review/>
            <Bias />
        </LibraryLayout>
    )
}