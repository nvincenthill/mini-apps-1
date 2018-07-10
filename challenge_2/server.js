const express = require("express");
const app = express();

app.get("/get", (req, res) => res.send("Hello World!"));

app.listen(3000, () => console.log("JSON to CSV listening on port 3000!"));

app.use(express.static("client"));

app.post("/", function(req, res) {
  console.log(req);
  let unconvertedData = { hello: "world" };
  let dataToSend = convertJsonToCsv(unconvertedData);
  res.send(dataToSend);
});

let convertJsonToCsv = dataToConvert => {
  // turn dataToConvert into convertedData

  let convertedData;
  convertedData = [
    ["name1", "city1", "some other info"],
    ["name2", "city2", "more info"]
  ];

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
