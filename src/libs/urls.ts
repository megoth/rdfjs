export function toCodePart(id: string, line: string, ...lines: string[]): string {
    const dataLines = [line, ...lines].map((value) => `data-line=${value}`).join("&");
    return `?${dataLines}#${id}`;
}