interface CodeProps {
    children: string | undefined;
    language: "turtle" | "tsx" | "typescript";
}


export default function Code({children, language}: CodeProps) {
    return (
        <pre className={`language-${language}`}>
            <code className={`language-${language}`}>
                {children}
            </code>
        </pre>
    )
}