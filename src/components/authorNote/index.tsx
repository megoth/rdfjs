import {ReactNode} from "react";
import styles from "./style.module.css";
import {clsx} from "clsx";

interface Props {
    children: ReactNode;
}

export default function AuthorNote({children}: Props) {
    return (
        <div className={clsx("card", styles.card)}>
            <div className="card-content">
                <div className={clsx("media", styles.media)}>
                    <div className="media-content">
                        <p className="title is-5">Author's note</p>
                        <p className="subtitle is-6">Arne Hassel</p>
                    </div>
                    <div className="media-right">
                        <figure className="image is-48x48">
                            <img className={styles.img} src="/arne.png" alt="Picture of author, Arne Hassel" />
                        </figure>
                    </div>
                </div>

                <div className="content">{children}</div>
            </div>
        </div>
    )
}