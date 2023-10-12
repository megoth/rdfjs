import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import LDO from "./ldo";
import Frontpage from "./frontpage";
import Layout from "./layout";
import "bulma/css/bulma.min.css"
import Inrupt from "./rdflib";
import Rdflib from "./inrupt";
import {BrowserSolidLdoProvider} from '@ldo/solid-react';

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
            element: <BrowserSolidLdoProvider><LDO/></BrowserSolidLdoProvider>,
        },
        {
            path: "/inrupt",
            element: <Inrupt/>,
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
