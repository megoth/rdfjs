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
                    <div className="message-header">Website under review</div>
                    <div className="message-body">
                        This website is currently being review before final launch. If you have any notes that you want
                        to share with me, please DM me if you can or create an issue on the <a
                        href="https://github.com/megoth/rdfjs/issues">website's project page</a>.
                    </div>
                </div>
                <Outlet/>
            </main>
            <Footer className={styles.footer}/>
            <ScrollRestoration/>
        </div>
    )
}