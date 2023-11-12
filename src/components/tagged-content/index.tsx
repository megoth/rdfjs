import Content from "../content";
import {HTMLAttributes} from "react";
import {TagModel} from "../../constants.tsx";
import Tag from "../tag";
import Tags from "../tags";

interface Props extends HTMLAttributes<HTMLDivElement> {
    tags: Array<TagModel>
}

export default function TaggedContent({children, tags, title, ...props}: Props) {
    return (
        <Content {...props}>
            {title && <h3 className="subtitle" style={{marginTop: 0}}>{title}</h3>}

            {tags.length > 0 && <Tags>
                {tags.map((tag) => <Tag key={tag.name} tag={tag}/>)}
            </Tags>}

            {children}
        </Content>
    )
}