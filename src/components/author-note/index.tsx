import {HTMLAttributes, ReactNode} from "react";
import styles from "./style.module.css";
import {clsx} from "clsx";
import Card from "../card";
import Content from "../content";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    children: ReactNode;
    title?: ReactNode;
}

export default function AuthorNote({children, title, ...props}: Props) {
    return (
        <Card className={styles.card} {...props}>
            <div className="card-content">
                <div className={clsx("media", styles.media)}>
                    <div className={clsx("media-content", styles.mediaContent)}>
                        <p className="title is-4">{title || "Author's note"}</p>
                    </div>
                    <div className="media-right">
                        <figure className={clsx("image", styles.image)}>
                            <img className={styles.img} src="/arne.png" alt="Picture of author, Arne Hassel"/>
                        </figure>
                    </div>
                </div>
                <Content className={styles.content}>
                    {children}
                </Content>
            </div>
        </Card>
    )
}