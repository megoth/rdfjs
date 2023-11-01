import {ReactNode} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ClientComponent from "./component.tsx";

export default function ClientWrapper(): ReactNode {
    return <RouterProvider router={createBrowserRouter([{
        path: location.pathname,
        element: <ClientComponent/>
    }, {
        path: "*",
        element: <></>
    }])}/>;
}