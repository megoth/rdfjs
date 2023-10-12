import BodyMarkdown from "./body.mdx";
import Content from "../content";

export default function Frontpage() {
    return (
        <>
            <h1 className="title">RDF + JS = &#10084;</h1>
            <Content>
                <BodyMarkdown/>
            </Content>
        </>
    );
}