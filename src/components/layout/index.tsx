import Navigation from "../navigation";
import {Outlet, ScrollRestoration} from "react-router-dom";
import styles from "./style.module.css";
import Footer from "./footer";
import {clsx} from "clsx";
import Container from "../container";

export default function Layout() {
    return (
        <div>
            <Navigation className="container"/>
            <main className={styles.main}>
                <Container>
                    <div className="message is-light is-small">
                        <div className="message-header">Work in progress</div>
                        <div className="message-body">
                            This website is a work in progress. Things might change radically.
                        </div>
                    </div>
                </Container>
                <Outlet/>
            </main>
            <Footer className={clsx("container", styles.footer)}/>
            <ScrollRestoration/>
        </div>
    )
}