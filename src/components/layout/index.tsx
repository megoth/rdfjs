import Navigation from "../navigation";
import {Outlet} from "react-router-dom";
import styles from "./style.module.css";
import Footer from "./footer";
import {useContext} from "react";
import DeveloperModeContext from "../../contexts/developer-mode";
import DeveloperMode from "../developer-mode";
import {clsx} from "clsx";

export default function Layout() {
    const {developerMode} = useContext(DeveloperModeContext);
    return (
        <div className={clsx({[styles.outerContainer]: developerMode})}>
            {developerMode && <div/>}
            <div className="container">
                <Navigation/>
                <main className={styles.main}>
                    <Outlet/>
                </main>
                <Footer className={styles.footer}/>
            </div>
            {developerMode && <DeveloperMode/>}
        </div>
    )
}