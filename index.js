import express from "express";
import "./dist/server/index.js";

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("One step at a time");
})

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
    console.log("RUNNING SERVER");
});

export default app