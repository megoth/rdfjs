import ReactDOM from "react-dom/client";
import React from "react";
import {BrowserSolidLdoProvider} from "@ldo/solid-react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserSolidLdoProvider>
            // Your Content Here
        </BrowserSolidLdoProvider>
    </React.StrictMode>,
)