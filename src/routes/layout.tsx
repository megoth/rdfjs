import "bulma/css/bulma.min.css"
import Navigation from "../components/navigation";
import styles from "./layout.module.css";
import Footer from "../components/footer";
import {lazy, ReactNode} from "react";
import {ClientSuspense, Head} from "rakkasjs";
import {BrowserSolidLdoProvider} from "@ldo/solid-react";
import {NotificationContextProvider} from "../hooks/use-notification";

interface Props {
    children?: ReactNode
}

const ClientComponent = lazy(() => import("./client"));

export default function Layout({children}: Props) {
    return (
        <BrowserSolidLdoProvider>
            <NotificationContextProvider>
                <Head link={[
                    { href: "./prism.css", rel: "stylesheet"},
                    { href: "./rdfjs.png", rel: "icon"}
                ]}/>
                <div className="container">
                    <Navigation/>
                    <main className={styles.main}>
                        <div className="message is-info is-small">
                            <div className="message-body">
                                This website is currently being reviewed for quality control. If you have any feedback
                                on this website that you want to share with me, I would appreciate it if you send me a
                                message (on a channel you know me) or create an issue on the <a
                                href="https://github.com/megoth/rdfjs/issues">website's project page</a>.
                            </div>
                        </div>
                        {children}
                        <script src="./prism.js" />
                    </main>
                    <Footer className={styles.footer}/>
                </div>
                <ClientSuspense fallback="">
                    {<ClientComponent />}
                </ClientSuspense>
            </NotificationContextProvider>
        </BrowserSolidLdoProvider>
    )
}