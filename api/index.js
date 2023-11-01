import server from "../dist/server";

console.log("RUNNING SERVER", server);

export default function handler(request, response) {
    return response.send("Hello RDF + JS = ❤");
}