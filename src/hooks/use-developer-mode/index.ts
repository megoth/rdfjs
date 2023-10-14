import {useContext} from "react";
import DeveloperModeContext from "../../contexts/developer-mode";

export default function useDeveloperMode(fetch: (input: RequestInfo, options?: RequestInit) => Promise<Response>) {
    return {
        fetch: async (input: RequestInfo, options?: RequestInit) => {
            console.log("FETCH INPUT", input);
            console.log("FETCH OPTIONS", options);
            const response = await fetch(input, options);
            console.log("RESPONSE", response);
            return response;
        },
        ...useContext(DeveloperModeContext),
    };
}