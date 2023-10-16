import {BsFillHeartFill, BsHeart} from "react-icons/bs";
import styles from "./style.module.css";
import {Fragment} from "react";

export type RatingScore = 1 | 2 | 3 | 4 | 5;

interface Props {
    rating: RatingScore;
}

export default function Rating({rating}: Props) {
    const stars = Array.from(Array(5)).map((_, index) => index < rating)
    return <span className={styles.rating}>
        {stars.map((isRated, index) => <Fragment key={`rating-${index}`}>
            {isRated ?
                <BsFillHeartFill className={styles.icon}/> :
                <BsHeart className={styles.icon}/>
            }
        </Fragment>)}
    </span>;
}