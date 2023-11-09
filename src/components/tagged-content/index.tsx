import Content from "../content";
import {HTMLAttributes} from "react";
import {TagModel} from "../../constants.tsx";
import Tag from "../tag";
import {clsx} from "clsx";
import styles from "./styles.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
    tags: Array<TagModel>
}

export default function TaggedContent({children, tags, title, ...props}: Props) {
    return (
        <Content {...props}>
            {title && <h3 className="subtitle">{title}</h3>}

            {tags.length > 0 && <div className={clsx("tags", styles.tags)}>
                {tags.map((tag) => <Tag key={tag.name} tag={tag}/>)}
            </div>}

            {children}
        </Content>
    )
}