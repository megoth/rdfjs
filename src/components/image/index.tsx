import {clsx} from "clsx";
import {HTMLAttributes} from "react";
import styles from "./styles.module.css";

export default function Image({className, ...props}: HTMLAttributes<HTMLPictureElement>) {
    return<picture className={clsx("image", styles.image, className)} {...props} />
}