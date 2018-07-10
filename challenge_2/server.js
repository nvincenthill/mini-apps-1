// TODO: Allow some fields to be optional
// TODO: Modularize and refactor code
// TODO: Allow the children property to be optional
// TODO: Add a field to the CSV report that specifies the ID of the parent record
// TODO: Add a form field that allows the user to enter a string, which, when present will filter (remove from the CSV report) any records that contain that string

const express = require("express");
const app = express();
var parser = require("body-parser");

app.get("/get", (req, res) => res.send("Hello World!"));

app.listen(3000, () => console.log("JSON to CSV listening on port 3000!"));

app.use(parser.json());

app.use(express.static("client"));

app.post("/", function(req, res) {
  console.log("Handling a POST request");
  let unconvertedData = req.body;
  let dataToSend = convertJsonToCsv(unconvertedData);
  res.send(dataToSend);
});

let createFirstRow = dataToConvert => {
  let keys = Object.keys(dataToConvert);
  let firstRow = [];
  // add a primary key field
  firstRow.push("id");
  for (let i = 0; i < keys.length - 1; i++) {
    firstRow.push(keys[i]);
  }
  let convertedData = [firstRow];
  return convertedData;
};

let convertJsonToCsv = dataToConvert => {
  let convertedData = createFirstRow(dataToConvert);
  let key = 0;
  let convertData = obj => {
    let temp = [];
    let keys = Object.keys(obj);
    temp.push(key);
    key++;
    for (let i = 0; i < keys.length - 1; i++) {
      temp.push(obj[keys[i]]);
    }
    convertedData.push(temp);

    // base case
    if (obj["children"].length === 0) {
      return convertedData;
    }

    //recursively call on all children
    for (let i = 0; i < obj.children.length; i++) {
      convertData(obj.children[i]);
    }
  };
  convertData(dataToConvert);
  return convertedData;
};

// const rows = [
//     ["name1", "city1", "some other info"],
//     ["name2", "city2", "more info"]
//   ];

// firstName,lastName,county,city,role,sales
// Joshie,Wyattson,San Mateo,San Mateo,Broker,1000000
// Beth Jr.,Johnson,San Mateo,Pacifica,Manager,2900000
// Smitty,Won,San Mateo,Redwood City,Sales Person,4800000
// Allen,Price,San Mateo,Burlingame,Sales Person,2500000
// Beth,Johnson,San Francisco,San Francisco,Broker/Sales Person,7500000

// {
//     "firstName": "Joshie",
//     "lastName": "Wyattson",
//     "county": "San Mateo",
//     "city": "San Mateo",
//     "role": "Broker",
//     "sales": 1000000,
//     "children": [
//     {
//       "firstName": "Beth Jr.",
//       "lastName": "Johnson",
//       "county": "San Mateo",
//       "city": "Pacifica",
//       "role": "Manager",
//       "sales": 2900000,
//       "children": [
//         {
//           "firstName": "Smitty",
//           "lastName": "Won",
//           "county": "San Mateo",
//           "city": "Redwood City",
//           "role": "Sales Person",
//           "sales": 4800000,
//           "children": []
//         },
//         {
//           "firstName": "Allen",
//           "lastName": "Price",
//           "county": "San Mateo",
//           "city": "Burlingame",
//           "role": "Sales Person",
//           "sales": 2500000,
//           "children": []
//         }
//       ]
//     },
//     {
//       "firstName": "Beth",
//       "lastName": "Johnson",
//       "county": "San Francisco",
//       "city": "San Francisco",
//       "role": "Broker/Sales Person",
//       "sales": 7500000,
//       "children": []
//     }
//   ]
// };
