import {HTMLAttributes, ReactNode, useEffect, useState} from "react";
import styles from "../style.module.css";
import {clsx} from "clsx";
import {MdOutlineClear} from "react-icons/md";
import {IoExitOutline} from "react-icons/io5";
import {StyledLink} from "rakkasjs";
import {useCopyToClipboard} from "../../../hooks/use-copy-to-clipboard";
import useNotification from "../../../hooks/use-notification";
import usePrism from "../../../hooks/use-prism";
import {parseSearch} from "../../../libs/location.ts";

export interface CodeProps extends HTMLAttributes<HTMLPreElement> {
    children?: ReactNode;
    code: string;
    noCopy?: boolean;
    id: string;
    language: "sparql" | "tsx" | "turtle" | "typescript";
    url?: string;
}

export default function CodeClient({children, className, code, noCopy, id, language, url, ...props}: CodeProps) {
    const highlightAll = usePrism();
    const {notify} = useNotification();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, copy] = useCopyToClipboard();
    const [dataLine, setDataLine] = useState<string[]>([]);
    const { hash, search } = location;

    useEffect(() => {
        setDataLine([]);
        highlightAll();
        if (hash.replace("#", "") !== id) return;
        setDataLine(parseSearch(search)["data-line"] || []);
        highlightAll();
    }, [hash, highlightAll, id, search]);

    const dataLineProps = dataLine.length ? {"data-line": dataLine.join(",")} : {};
    const alteredClassName = className && dataLine.length
        ? className.replace("line-numbers", "")
        : className;

    const copyCode = async () => {
        await copy(code);
        notify(<>Copied code to clipboard</>)
    }

    return (
        <div id={id} className={styles.container}>
            {children && <>
                <div className="message is-hidden-widescreen is-warning">
                    <div className="message-header">A note on smaller screens</div>
                    <div className="message-body">
                        These walkthroughes are best consumed at larger screens. If you are on smaller screens, note
                        that
                        you might have to scroll down a bit to see the actual highlighted code.
                    </div>
                </div>
                <table className="table is-striped">
                    <thead>
                    <tr>
                        <th>Part of logic</th>
                        <th>Explanation</th>
                    </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </>}
            <div className={clsx("field is-grouped is-grouped-right is-grouped-multiline", styles.field)}>
                {dataLine.length > 0 && <p className="control">
                    <StyledLink href={`?#${id}`} className={"button is-small is-danger is-light"}>
                        <span className="icon is-small"><MdOutlineClear/></span>
                        <span>Clear highlighted code</span>
                    </StyledLink>
                </p>}
                {url && <p className="control">
                    <a href={url} className={"button is-small is-light"}>
                        <span className="icon is-small"><IoExitOutline/></span>
                        <span>Go to code in project's GH repo</span>
                    </a>
                </p>}
                {!noCopy && <p className="control">
                    <button className="button is-small is-light" onClick={() => copyCode()}>
                        <span>Copy code</span>
                    </button>
                </p>}
            </div>
            <pre className={clsx(`language-${language}`, alteredClassName, styles.code)} {...props} {...dataLineProps}>
                <code className={`language-${language}`}>
                    {code}
                </code>
            </pre>
        </div>
    )
}