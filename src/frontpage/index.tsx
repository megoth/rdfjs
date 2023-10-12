import BodyMarkdown from "./body.mdx";
import Content from "../content";
import Logo from "../logo";

export default function Frontpage() {
    return (
        <>
            <h1 className="title"><Logo /></h1>
            <Content>
                <BodyMarkdown/>
            </Content>
        </>
    );
}