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
import Comunica from "./components/comunica";

import RDFGuide from "./components/rdf-guide";
import ShExGuide from "./components/shex-guide";
import SPARQLGuide from "./components/sparql-guide";
import SolidGuide from "./components/solid-guide";
import TypeScriptGuide from "./components/typescript-guide";
import ReactGuide from "./components/react-guide";
import JavascriptGuide from "./components/javascript-guide";
import {NotificationContextProvider} from "./hooks/use-notification/provider.tsx";
import MLd from "./components/m-ld";
import MLdPeer from "./components/m-ld/peer";
import CRDTGuide from "./components/crdt-guide";
import RdfExt from "./components/rdf-ext";

const router = createBrowserRouter([
    {
        path: "/m-ld/:domainId",
        element: <MLdPeer/>,
    },
    {
        path: "/",
        element: <BrowserSolidLdoProvider><Layout/></BrowserSolidLdoProvider>,
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
                path: "/crdt",
                element: <CRDTGuide/>,
            },
            {
                path: "/inrupt",
                element: <Inrupt/>,
            },
            {
                path: "/javascript",
                element: <JavascriptGuide/>,
            },
            {
                path: "/ldo",
                element: <LDO/>,
            },
            {
                path: "/m-ld",
                element: <MLd/>,
            },
            {
                path: "/rdf-ext",
                element: <RdfExt/>,
            },
            {
                path: "/rdflib",
                element: <Rdflib/>,
            },
            {
                path: "/soukai",
                element: <Soukai/>,
            },
            {
                path: "/rdf",
                element: <RDFGuide/>,
            },
            {
                path: "/shex",
                element: <ShExGuide/>,
            },
            {
                path: "/solid",
                element: <SolidGuide/>,
            },
            {
                path: "/sparql",
                element: <SPARQLGuide/>,
            },
            {
                path: "/typescript",
                element: <TypeScriptGuide/>,
            },
            {
                path: "/react",
                element: <ReactGuide/>,
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <NotificationContextProvider>
            <RouterProvider router={router}/>
        </NotificationContextProvider>
    </React.StrictMode>,
)
