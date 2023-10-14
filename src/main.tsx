import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import LDOSolidReact from "./components/ldo-solid-react";
import Frontpage from "./components/frontpage";
import Layout from "./components/layout";
import "bulma/css/bulma.min.css"
import Rdflib from "./components/rdflib";
import {BrowserSolidLdoProvider} from '@ldo/solid-react';
import LDO from "./components/ldo";
import RdflibSolid from "./components/rdflib-solid";
import Inrupt from "./components/inrupt";
import SoukaiSolid from "./components/soukai-solid";
import Soukai from "./components/soukai";
import {NotificationContextProvider} from "./contexts/notification";

const router = createBrowserRouter([{
    path: "/",
    element: <Layout/>,
    children: [
        {
            index: true,
            element: <Frontpage/>,
        },
        {
            path: "/ldo",
            element: <LDO/>,
        },
        {
            path: "/soukai",
            element: <Soukai/>,
        },
        {
            path: "/ldo-solid-react",
            element: <LDOSolidReact/>,
        },
        {
            path: "/rdflib",
            element: <Rdflib/>,
        },
        {
            path: "/rdflib-solid",
            element: <RdflibSolid/>,
        },
        {
            path: "/inrupt",
            element: <Inrupt/>,
        },
        {
            path: "/soukai-solid",
            element: <SoukaiSolid/>,
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
