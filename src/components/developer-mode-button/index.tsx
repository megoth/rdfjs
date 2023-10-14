import {useContext} from "react";
import DeveloperModeContext from "../../contexts/developer-mode";

export default function DeveloperModeButton() {
    const {developerMode, setDeveloperMode} = useContext(DeveloperModeContext);

    return (
        <button className="button is-dark is-small" onClick={() => setDeveloperMode(!developerMode)}>
            Developer mode is {developerMode ? "on" : "off"}
        </button>
    );
}