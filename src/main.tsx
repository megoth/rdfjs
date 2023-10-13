import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import LDOSolidReact from "./ldo-solid-react";
import Frontpage from "./frontpage";
import Layout from "./layout";
import "bulma/css/bulma.min.css"
import Rdflib from "./rdflib";
import {BrowserSolidLdoProvider} from '@ldo/solid-react';
import LDO from "./ldo";

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
            element: <LDO />,
        },
        {
            path: "/ldo-solid-react",
            element: <BrowserSolidLdoProvider><LDOSolidReact/></BrowserSolidLdoProvider>,
        },
        {
            path: "/rdflib",
            element: <Rdflib/>,
        },
    ]
}]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
