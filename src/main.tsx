import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Frontpage from "./components/frontpage";
import Layout from "./components/layout";
import "bulma/css/bulma.min.css"
import Rdflib from "./components/rdflib";
import {BrowserSolidLdoProvider} from '@ldo/solid-react';
import LDO from "./components/ldo";
import Inrupt from "./components/inrupt";
import Soukai from "./components/soukai";
import {NotificationContextProvider} from "./contexts/notification";
import Comunica from "./components/comunica";

const router = createBrowserRouter([{
    path: "/",
    element: <Layout/>,
    children: [
        {
            index: true,
            element: <Frontpage/>,
        },
        {
            path: "/comunica",
            element: <Comunica/>,
        },
        {
            path: "/inrupt",
            element: <Inrupt/>,
        },
        {
            path: "/ldo",
            element: <LDO/>,
        },
        {
            path: "/rdflib",
            element: <Rdflib/>,
        },
        {
            path: "/soukai",
            element: <Soukai/>,
        },
    ]
}]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserSolidLdoProvider>
            <NotificationContextProvider>
                <RouterProvider router={router}/>
            </NotificationContextProvider>
        </BrowserSolidLdoProvider>
    </React.StrictMode>,
)
