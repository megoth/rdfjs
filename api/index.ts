import type { VercelRequest, VercelResponse } from '@vercel/node';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import server from "../dist/server/index.js";

console.log("RUNNING SERVER", server);

export default function handler(_request: VercelRequest, response: VercelResponse) {
    return response.status(200).send("Hello RDF + JS = ❤");
}