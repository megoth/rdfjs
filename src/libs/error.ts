export function extractError(error: unknown, unknownMessage: string): Error {
    return error
        ? (typeof error === "string" ? new Error(error) : error as Error)
        : new Error(unknownMessage);
}