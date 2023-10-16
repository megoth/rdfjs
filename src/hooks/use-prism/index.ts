import {useCallback, useLayoutEffect} from "react";

export default function usePrism() {
    const highlightAll = useCallback(() => {
        setTimeout((window as any).Prism.highlightAll);
    }, []);
    useLayoutEffect(() => highlightAll(), [highlightAll]);
    return highlightAll;
}