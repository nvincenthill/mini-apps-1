const express = require("express");
const parser = require("body-parser");
const app = express();
const base = require("mongodb");

// app.get("/get", (req, res) => res.send("Hello World!"));

app.listen(3000, () => console.log("Listening on port 3000!"));

// create body
// app.use(
//   parser.urlencoded({
//     extended: true
//   })
// );

app.use(parser.json());

// host static files
app.use(express.static("node_modules"));
app.use(express.static("compiled"));
app.use(express.static("public"));

app.post("/", function(req, res) {
  console.log("Handling a POST request");
  console.log(req.body);
  // Post data to mongoDB

  res.send(req.body);
});

let commitToDB = () => {
  console.log("committing to mongoDB");
};
