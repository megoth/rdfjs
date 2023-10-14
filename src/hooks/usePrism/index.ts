import {useEffect} from "react";

export default function usePrism() {
    useEffect(() => (window as any).Prism.highlightAll(), []);
}