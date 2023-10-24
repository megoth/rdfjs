import Navigation from "../navigation";
import {Outlet, ScrollRestoration} from "react-router-dom";
import styles from "./style.module.css";
import Footer from "./footer";

export default function Layout() {
    return (
        <div className="container">
            <Navigation/>
            <main className={styles.main}>
                <div className="message is-light is-small">
                    <div className="message-header">Work in progress</div>
                    <div className="message-body">
                        This website is a work in progress. Things might change radically.
                    </div>
                </div>
                <Outlet/>
            </main>
            <Footer className={styles.footer}/>
            <ScrollRestoration/>
        </div>
    )
}