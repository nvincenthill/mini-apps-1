const express = require("express");
const app = express();

// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log("JSON to CSV listening on port 3000!"));

app.use(express.static("client"));

app.post("/", function(req, res) {
  res.send("Got a POST request");
});
