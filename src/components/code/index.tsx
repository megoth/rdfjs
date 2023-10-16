import {HTMLAttributes} from "react";

interface CodeProps extends HTMLAttributes<HTMLPreElement> {
    children: string | undefined;
    language: "turtle" | "tsx" | "typescript";
}


export default function Code({children, language, ...props}: CodeProps) {
    return (
        <pre className={`language-${language}`} {...props}>
            <code className={`language-${language}`}>
                {children}
            </code>
        </pre>
    )
}