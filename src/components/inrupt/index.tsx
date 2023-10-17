import Login from "../login";
import InruptDemo from "./demo";
import {useSolidAuth} from "@ldo/solid-react";
import Code from "../code";
import demoCode from "./demo/index.tsx?raw";
import IntroSection from "./intro.mdx";
import CodeSection from "./code.mdx";
import Content from "../content";
import LogoutButton from "../logout-button";
import Review from "./review.mdx";
import LibraryHeader from "../library-header";
import {LIBRARY_INRUPT} from "../../constants.ts";
import ReviewHeader from "../review-header";

export default function Inrupt() {
    const {login, session} = useSolidAuth();
    return (
        <>
            <LibraryHeader library={LIBRARY_INRUPT}/>
            <Content><IntroSection/></Content>
            <ReviewHeader library={LIBRARY_INRUPT}/>
            <div id="solid">
                <Code language={"tsx"} id="InruptSolidDemo" code={demoCode}>
                    <h2 className="subtitle is-3">Solid demo</h2>
                    {session.isLoggedIn ? <>
                        <InruptDemo/>
                        <LogoutButton/>
                    </> : <Login login={login}/>}
                    <Content><CodeSection/></Content>
                </Code>
            </div>
            <Review/>
        </>
    )
}