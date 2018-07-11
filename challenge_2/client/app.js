let fileName = "filename.csv";

$("#form").on("submit", function(e) {
  e.preventDefault();
  console.log("form submitted");
  fileName = cleanFileName(document.getElementById("file-input").value);
  let jsonInput = document.getElementById("json-input").value;
  console.log(JSON.parse(jsonInput));
  handleSubmit(jsonInput);
});

let cleanFileName = name => {
  if (
    name[name.length - 4] !== "." &&
    name[name.length - 3] !== "c" &&
    (name[name.length - 2] !== "s"[name.length - 1]) !== "v"
  ) {
    return name + ".csv";
  } else {
    return name;
  }
};

const handleSubmit = json => {
  console.log("handling submission");
  postData(`http://localhost:3000`, json)
    .then(data => prepareCSV(data)) // JSON from `response.json()` call
    .catch(error => console.error(error));
  $("#json-input").val("");
  $("#file-input").val("");
  $("#table").css("display", "inline-block");
};

const postData = (url = ``, data = {}) => {
  console.log("posting data");
  // Default options are marked with *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: data // body data type must match "Content-Type" header
  })
    .then(response => {
      // console.log(response.text());
      return response.json();
    }) // parses response to JSON
    .catch(error => console.error(`Fetch Error :\n`, error));
};

const prepareCSV = data => {
  arrayToTable(data);
  let csvContent = "data:text/csv;charset=utf-8,";
  data.forEach(function(rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
  });
  downloadCSV(csvContent);
};

const downloadCSV = csvContent => {
  let encodedUri = encodeURI(csvContent);
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName);
  // link.innerHTML = "Click Here to download";

  link.click(); // This will download the data file named "my_data.csv".
};

const arrayToTable = tableData => {
  console.log(tableData);
  var table = $("<table></table>");
  $(tableData).each(function(i, rowData) {
    let row = $("<tr></tr>");
    $(rowData).each(function(j, cellData) {
      if (i === 0) {
        row.append($("<th align='left'>" + cellData + "</th>"));
      } else {
        row.append($("<td align='left'>" + cellData + "</td>"));
      }
    });
    table.append(row);
  });
  $("#table").append(table);
};

// handle drag and drop

const dragenter = e => {
  e.stopPropagation();
  e.preventDefault();
  $("#json-input").css("background", "#eee");
  // $(document).mousemove(function(event) {
  //   windowWidth = $(window).width();
  //   windowHeight = $(window).height();

  //   mouseXpercentage = Math.round((event.pageX / windowWidth) * 100);
  //   mouseYpercentage = Math.round((event.pageY / windowHeight) * 100);

  //   $("#json-input").css(
  //     "background",
  //     "radial-gradient(at " +
  //       mouseXpercentage +
  //       "% " +
  //       mouseYpercentage +
  //       "%, green, #222)"
  //   );
  // });
};

const dragleave = e => {
  e.stopPropagation();
  e.preventDefault();
  $("#json-input").css("background", "");
};

const dragover = e => {
  e.stopPropagation();
  e.preventDefault();
};

const drop = e => {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  $("#json-input").css("background", "");
  handleDrop(files);
};

handleDrop = files => {
  var reader = new FileReader();
  reader.readAsText(files[0]);
  reader.onloadend = function(ev) {
    console.log(ev.target.result);
    let fileText = ev.target.result;
    populateInputField(fileText);
  };
};

populateInputField = str => {
  $("#json-input").val(str);
  // $("#file-input").val("");
};

let dropbox = document.getElementById("json-input");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragleave", dragleave, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);
