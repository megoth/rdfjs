import Card from "../../card";
import {HTMLAttributes} from "react";
import TaggedContent from "../../tagged-content";
import {UseCase} from "../../../constants.tsx";
import {useSearchParams} from "react-router-dom";
import {clsx} from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
    useCase: UseCase
}

export default function BusinessGuideUseCase({useCase: {body, image, imageAlt, title, tags}, ...props}: Props) {
    const [searchParams] = useSearchParams();
    const isSelected = searchParams.getAll("tag").filter((value) => tags.find(({name}) => name === value)).length > 0;
    const onClick = () => alert("Let's do something cool here");
    return (
        <div {...props}>
            <Card onClick={onClick} style={{cursor: "pointer"}}>
                <div className="card-image">
                    <figure className="image is-2by1">
                        <img src={image} alt={imageAlt}/>
                    </figure>
                </div>
                <div className="card-content">
                    <TaggedContent title={title} tags={tags}>
                        {body}
                    </TaggedContent>
                </div>
                <div className="card-footer">
                    <div className={clsx("card-footer-item button is-info", {
                        "is-light": !isSelected,
                    })}>
                        Read more
                    </div>
                </div>
            </Card>
        </div>
    )
}