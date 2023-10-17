import {HTMLAttributes, ReactNode, useEffect, useState} from "react";
import {NavLink, useLocation, useSearchParams} from "react-router-dom";
import usePrism from "../../hooks/use-prism";
import {clsx} from "clsx";
import {useCopyToClipboard} from "../../hooks/use-copy-to-clipboard";
import useNotification from "../../hooks/use-notification";
import styles from "./style.module.css";
import {BsFillClipboardCheckFill, BsFillClipboardPlusFill} from "react-icons/bs";
import {MdOutlineClear} from "react-icons/md";
import {IoExitOutline} from "react-icons/io5";

interface CodeProps extends HTMLAttributes<HTMLPreElement> {
    children: ReactNode;
    code: string;
    id: string;
    language: "turtle" | "tsx" | "typescript";
    url?: string;
}

export function toCodePart(id: string, line: string, ...lines: string[]): string {
    const dataLines = [line, ...lines].map((value) => `data-line=${value}`).join("&");
    return `?${dataLines}#${id}`;
}


export default function Code({children, code, id, language, url, ...props}: CodeProps) {
    const highlightAll = usePrism();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [dataLine, setDataLine] = useState<string[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_value, copy] = useCopyToClipboard();
    const {notify} = useNotification();

    useEffect(() => {
        setDataLine([]);
        highlightAll();
        if (location.hash.replace("#", "") !== id) return;
        setDataLine(searchParams.getAll("data-line"));
        highlightAll();
    }, [highlightAll, id, location, searchParams]);

    const copyCode = async () => {
        await copy(code);
        notify(<>Copied code to clipboard <BsFillClipboardCheckFill /></>)
    }

    const dataLineProps = dataLine.length ? {"data-line": dataLine.join(",")} : {};

    return (
        <div id={id} className={styles.container}>
            {children}
            <div className={clsx("field is-grouped is-grouped-right is-grouped-multiline", styles.field)}>
                {dataLine.length > 0 && <>
                    <p className="control">
                        <NavLink to={`#${id}`} className={"button is-small is-warning is-light"}
                                 preventScrollReset={true}>
                            <span className="icon is-small"><MdOutlineClear /></span>
                            <span>Clear highlighted code</span>
                        </NavLink>
                    </p>
                </>}
                {url && <>
                    <p className="control">
                        <a href={url} className={"button is-small is-light"}>
                            <span className="icon is-small"><IoExitOutline /></span>
                            <span>Go to code in project's GH repo</span>
                        </a>
                    </p>
                </>}
                <p className="control">
                    <button className="button is-small is-light" onClick={() => copyCode()}>
                        <span className="icon is-small"><BsFillClipboardPlusFill /></span>
                        <span>Copy code</span>
                    </button>
                </p>
            </div>
            <pre className={clsx(`language-${language}`, {
                "line-numbers": dataLine.length === 0
            })} {...props} {...dataLineProps}>
                <code className={clsx(`language-${language}`, styles.code)}>
                    {code}
                </code>
            </pre>
        </div>
    )
}