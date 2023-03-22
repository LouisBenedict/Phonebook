const fs = require("fs");
const { parse } = require("csv-parse");

// const csvFilePath = "server/API/CSV/CSV.csv";
// const csv = require("csvtojson");

fs.createReadStream("./migration_data.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    console.log(row);
})
  .on("end", function () {
    console.log("finished");
})
  .on("error", function (error) {
    console.log(error.message);
});