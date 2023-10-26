import Navigation from "../navigation";
import {Outlet, ScrollRestoration} from "react-router-dom";
import styles from "./style.module.css";
import Footer from "./footer";

export default function Layout() {
    return (
        <div className="container">
            <Navigation/>
            <main className={styles.main}>
                <div className="message is-info is-small">
                    <div className="message-body">
                        This website is currently being review before final launch. If you have any feedback on this
                        website that you want to share with me, I would appreciate it if you send me a message (on a
                        channel you know me) or create an issue on the&nbsp;
                        <a href="https://github.com/megoth/rdfjs/issues">website's project page</a>.
                    </div>
                </div>
                <Outlet/>
            </main>
            <Footer className={styles.footer}/>
            <ScrollRestoration/>
        </div>
    )
}