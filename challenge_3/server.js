const express = require("express");
const app = express();

// app.get("/get", (req, res) => res.send("Hello World!"));

app.listen(3000, () => console.log("Listening on port 3000!"));

app.use(express.static("node_modules"));
app.use(express.static("compiled"));
app.use(express.static("public"));
