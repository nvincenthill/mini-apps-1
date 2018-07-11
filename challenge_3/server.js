const express = require("express");
const app = express();

// app.get("/get", (req, res) => res.send("Hello World!"));

app.listen(3000, () => console.log("Listening on port 3000!"));

app.use(express.static("node_modules"));
app.use(express.static("compiled"));
app.use(express.static("public"));

app.post("/", function(req, res) {
  console.log("Handling a POST request");

  // Post data to mongoDB

  // let unconvertedData = req.body;
  // let dataToSend = convertJsonToCsv(unconvertedData);
  // res.send(dataToSend);
});
