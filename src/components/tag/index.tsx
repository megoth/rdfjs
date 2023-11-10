import {clsx} from "clsx";
import TagLink from "../tag-link";
import {TagModel} from "../../constants.tsx";
import {useSearchParams} from "react-router-dom";
import {HTMLAttributes} from "react";

interface Props extends HTMLAttributes<HTMLSpanElement>{
    link?: boolean
    tag: TagModel
}

export default function Tag({link, tag, ...props}: Props) {
    const [searchParams] = useSearchParams();
    const isSelected = !!searchParams.getAll("tag").find((value) => value === tag.name);
    const className = clsx("tag", {"is-info": isSelected}, props.className);
    return link
        ? <TagLink className={clsx(className, {"button": link})} tag={tag} remove={isSelected} {...props}>
            {tag.label}
        </TagLink>
        : <span className={className} {...props}>{tag.label}</span>
}