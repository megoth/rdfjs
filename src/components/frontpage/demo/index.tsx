import Demo from "../../demo";

export default function FrontpageDemo() {
    return <Demo name={"Test name"} onSubmit={(data) => console.log(data.name)}/>
}