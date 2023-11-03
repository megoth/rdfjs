interface Props {
    error: Error
}

export default function ErrorMessage({ error }: Props) {
    return (
        <article className="message is-danger is-light is-small">
            <div className="message-header">Error</div>
            <div className="message-body">{error.message || error.name}</div>
        </article>
    );
}