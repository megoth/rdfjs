import {BsFillHeartFill} from "react-icons/bs";
import styles from "./style.module.css";
import {Fragment, HTMLAttributes} from "react";
import {clsx} from "clsx";

export type RatingScore = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

interface Props extends HTMLAttributes<HTMLSpanElement> {
    rating?: RatingScore;
}

export default function Rating({className, rating, ...props}: Props) {
    if (rating === undefined) return null;
    const stars = Array.from(Array(5)).map((_, index) => rating - index - 1)
    return <span className={clsx(styles.rating, className)} {...props}>
        {stars.map((normRating, index) => (
            <Fragment key={`rating-${index}`}>
                {normRating >= 0
                    ? <BsFillHeartFill className={styles.icon}/>
                    : (normRating === -0.5
                            ? <BsFillHeartFill className={styles.icon} style={{width: "0.75em"}}/>
                            : null
                    )
                }
            </Fragment>
        ))}
    </span>;
}