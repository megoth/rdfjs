import LibraryList, {Props as LibraryListProps} from "../library-list";
import Content from "../content";

interface Props extends LibraryListProps {
    title?: string;
}

export default function LibrarySection({title, ...props}: Props) {
    return (
        <>
            <Content>
                <h2>{title || "Ready to check out the libraries?"}</h2>
            </Content>
            <LibraryList {...props}/>
        </>
    )
}