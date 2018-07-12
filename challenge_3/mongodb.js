/* Install node-mongodb-native by doing:
 *  npm install mongodb
 * See documentation at https://github.com/mongodb/node-mongodb-native
 * Run this command in the terminal to launch mongo server:
 *  mongod --port 27017
 * Run this file with:
 *  node mongo-example.js
 */

// MONGO CLI COMMANDS
// show dbs
// use testdb
// show collections
// db['COLLECTION-NAME'].find({})
// db['COLLECTION-NAME'].remove({})

let mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/test";

// Open the client's connection to the server:
mongoClient.connect(
  url,
  function(err, client) {
    if (err) {
      throw err;
    }
    console.log("Connected to MongoDB!");
    const db = client.db("checkoutData");

    // Create a collection, if it doesn't exist already:
    db.createCollection("userData", function(err, collection) {
      if (err) {
        throw err;
      }
      console.log("Created collection");

      // Here's the document we want to insert:
      var testDocument = {
        name: "Jean Valjean",
        password: "24601"
      };

      // Insert it to the collection:
      collection.insert(testDocument, function(err, docs) {
        if (err) {
          throw err;
        }
        console.log("Inserted a document.");

        // Colletion#count() gives us the number of items in collection:
        collection.count(function(err, count) {
          if (err) {
            throw err;
          }
          console.log("This collection contains " + count + " documents.");
        });

        // Colletion#find() returns a "cursor"
        // that can be converted to an array of documents:
        collection.find().toArray(function(err, documents) {
          documents.forEach(function(document) {
            console.log("Found a document with name = " + document.name);
          });

          // Close the db connection when we're done with it:
          //   client.close();
          //   console.log("Closed the connection!");
        });
      });
    });
  }
);

module.exports = mongoClient;
