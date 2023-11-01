import {createContext, lazy} from "react";
import {CodeProps} from "./client";
import {ClientSuspense} from "rakkasjs";

export const CodeContext = createContext<{
    id: string
}>({
    id: ""
});

const ClientComponent = lazy(() => import("./client"));

export default function Code({id, ...props}: CodeProps) {
    return (
        <CodeContext.Provider value={{id}}>
            <ClientSuspense fallback={"Loading code..."}>
                {<ClientComponent id={id} {...props}/>}
            </ClientSuspense>
        </CodeContext.Provider>
    )
}