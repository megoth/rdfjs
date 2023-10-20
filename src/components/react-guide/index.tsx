import GuideLayout from "../guide-layout";
import {REACT_GUIDE} from "../../constants.ts";
import Content from "../content";

export default function ReactGuide() {
    return (
        <GuideLayout guide={REACT_GUIDE} minimal={true}>
            <Content>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Sit
                    amet aliquam id diam maecenas. Sit amet justo donec enim diam vulputate. Pellentesque sit amet
                    porttitor eget dolor morbi non arcu risus. </p>

                <p>Mi sit amet mauris commodo quis imperdiet massa tincidunt nunc. Sit amet nulla facilisi morbi.
                    Venenatis cras sed felis eget velit aliquet. Rhoncus est pellentesque elit ullamcorper dignissim
                    cras. Malesuada nunc vel risus commodo viverra.</p>
            </Content>
        </GuideLayout>
    )
}