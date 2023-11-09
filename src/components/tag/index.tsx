import {clsx} from "clsx";
import TagLink from "../tag-link";
import {TagModel} from "../../constants.tsx";
import {useSearchParams} from "react-router-dom";

interface Props {
    tag: TagModel
}

export default function Tag({tag}: Props) {
    const [searchParams] = useSearchParams();
    const isSelected = !!searchParams.getAll("tag").find((value) => value === tag.name);
    return (
        <TagLink className={clsx("tag", {
            "is-info": isSelected
        })} tag={tag} remove={isSelected}>
            {tag.label}
        </TagLink>
    )
}