import {BsFillHeartFill, BsHeart, BsHeartHalf} from "react-icons/bs";
import styles from "./style.module.css";
import {Fragment, HTMLAttributes} from "react";
import {clsx} from "clsx";

export type RatingScore = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

interface Props extends HTMLAttributes<HTMLSpanElement> {
    rating: RatingScore;
}

export default function Rating({className, rating, ...props}: Props) {
    const stars = Array.from(Array(5)).map((_, index) => rating - index - 1)
    return <span className={clsx(styles.rating, className)} {...props}>
        {stars.map((normRating, index) => (
            <Fragment key={`rating-${index}`}>
                {normRating >= 0
                    ? <BsFillHeartFill className={styles.icon}/>
                    : (normRating === -0.5
                            ? <BsHeartHalf className={styles.icon}/>
                            : <BsHeart className={styles.icon}/>
                    )
                }
            </Fragment>
        ))}
    </span>;
}