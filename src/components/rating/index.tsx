import styles from "./style.module.css";
import {Fragment, HTMLAttributes, lazy} from "react";
import {clsx} from "clsx";
import {ClientSuspense} from "rakkasjs";

export type RatingScore = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

interface Props extends HTMLAttributes<HTMLSpanElement> {
    rating: RatingScore;
}

const RatingIcon = lazy(() => import("./icon"));

export default function Rating({className, rating, ...props}: Props) {
    const stars = Array.from(Array(5)).map((_, index) => rating - index - 1)
    return <span className={clsx(styles.rating, className)} {...props}>
        {stars.map((normRating, index) => (
            <Fragment key={`rating-${index}`}>
                {normRating >= 0
                    ? (
                        <ClientSuspense fallback>
                            {<RatingIcon className={styles.icon}/>}
                        </ClientSuspense>
                    )
                    : (normRating === -0.5
                            ? (
                                <ClientSuspense fallback>
                                    {<RatingIcon className={styles.icon} style={{width: "0.75em"}}/>}
                                </ClientSuspense>
                            )
                            : null
                    )
                }
            </Fragment>
        ))}
    </span>;
}