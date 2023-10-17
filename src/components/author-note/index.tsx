import {ReactNode} from "react";
import styles from "./style.module.css";
import {clsx} from "clsx";

interface Props {
    children: ReactNode;
    title?: string;
}

export default function AuthorNote({children, title}: Props) {
    return (
        <div className={clsx("card", styles.card)}>
            <div className="card-content">
                <div className={clsx("media", styles.media)}>
                    <div className={clsx("media-content", styles.mediaContent)}>
                        <p className="title is-5">{title || "Author's note"}</p>
                    </div>
                    <div className="media-right">
                        <figure className={clsx("image", styles.image)}>
                            <img className={styles.img} src="/arne.png" alt="Picture of author, Arne Hassel"/>
                        </figure>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}