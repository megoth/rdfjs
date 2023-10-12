import Navigation from "../navigation";
import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <>
            <header>
                <h1>TITLE</h1>
            </header>
            <Navigation />
            <main>
                <Outlet />
            </main>
            <footer>
                FOOTER
            </footer>
        </>
    )
}