let currentData = {};
const express = require("express");
const parser = require("body-parser");
const base = require("mongodb");
const app = express();
app.use(parser.json());

// host static files
app.use(express.static("node_modules"));
app.use(express.static("compiled"));
app.use(express.static("public"));

app.post("/", function(req, res) {
  console.log("Handling a POST request");
  console.log("********************");
  currentData = req.body;
  res.send(req.body);
});

app.post("/purchase", function(req, res) {
  console.log("Handling a database POST request");
  console.log("********************");
  currentData = req.body;
  // Post data to mongoDB
  commitToDB(currentData);
  res.send(req.body);
});

let commitToDB = data => {
  console.log("CONTACTING THE MONGOD");
  const url = "mongodb://localhost:27017";
  base.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) {
        throw err;
      }
      console.log("********************");
      console.log("Connected to MongoDB!");
      const db = client.db("checkoutData");

      // Create a collection, if it doesn't exist already:
      db.createCollection("userData", function(err, collection) {
        if (err) {
          throw err;
        }

        // Insert it to the collection:
        collection.insert(data, function(err, docs) {
          if (err) {
            throw err;
          }
          console.log("********************");
          console.log("Inserted data into collection");

          // Colletion#count() gives us the number of items in collection:
          collection.countDocuments(function(err, count) {
            if (err) {
              throw err;
            }
            console.log("This collection contains " + count + " document(s).");
          });

          // Close the db connection when we're done with it:
          client.close();
          console.log("********************");
          console.log("Closed the connection!");
          console.log("####################");
        });
      });
    }
  );
};

app.listen(3000, () => console.log("Listening on port 3000!"));
console.log("********************");
