import {useContext} from "react";
import DeveloperModeContext from "../../contexts/developer-mode";
import styles from "./style.module.css";

export default function DeveloperModeButton() {
    const {developerMode, setDeveloperMode} = useContext(DeveloperModeContext);

    return (
        <button className="button is-dark is-small" onClick={() => setDeveloperMode(!developerMode)}>
            <span className={styles.largeText}>Developer mode is {developerMode ? "on" : "off"}</span>
            <span className={styles.smallText}>dev {developerMode ? "on" : "off"}</span>
        </button>
    );
}