import ErrorMessage from "../../error-message";
import styles from "./styles.module.css";

interface Props {
    domainId: string
    error?: Error | null
}

export default function MLdDemo({domainId, error}: Props) {
    return error
        ? <ErrorMessage error={error}/>
        : <>
            <div className={styles.container}>
                <iframe src={`/m-ld/${domainId}`}/>
                <iframe src={`/m-ld/${domainId}`}/>
            </div>
            <div className="message is-info is-small">
                <div className="message-body">
                    You might also consider <a href={`/m-ld/${domainId}`} target={"_blank"}>initiate a peer</a> in a
                    separate window.
                </div>
            </div>
        </>
}