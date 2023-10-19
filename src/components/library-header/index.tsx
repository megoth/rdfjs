import {LibraryLink} from "../../constants.ts";
import Content from "../content";

interface Props {
    library: LibraryLink
}

export default function LibraryHeader({library}: Props) {
    return (
        <Content>
            <h1 className="title is-4">{library.name}</h1>
            <ul>
                <li>Project page: <a href={library.websiteUrl}>{library.websiteName}</a></li>
                <li>Created by <a href={library.creatorUrl}>{library.creator}</a></li>
            </ul>
        </Content>
    );
}