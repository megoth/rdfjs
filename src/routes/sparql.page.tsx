import SPARQLGuide from "../components/sparql-guide";
import {Head} from "rakkasjs";

export default function SPARQLPage() {
    return <>
        <Head title={"SPARQL Protocol and RDF Query Language (SPARQL) | RDF + JS = ❤"}/>
        <SPARQLGuide/>
    </>
}