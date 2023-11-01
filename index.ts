import express from "express";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import server from "./dist/server/index.js";

const app = express();

app.listen(process.env.PORT, () => {
    console.log("RUNNING SERVER", server);
});

export default app