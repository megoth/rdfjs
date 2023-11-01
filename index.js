import express from "express";
import "./dist/server/index.js";

const app = express();

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
    console.log("RUNNING SERVER");
});

export default app