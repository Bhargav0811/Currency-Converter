var express = require("express");
var cors = require("cors");
const path = require("path");
var app = express();
var PORT = 3000;

app.use(
    cors({
        origin: "*"
    })
)

// With middleware
app.get("/file", function (req, res, next) {
  var options = {
    root: path.join(__dirname),
  };

  console.log(req.query.year);
  var fileName = `./Exchange_Rate_Report_${req.query.year}.csv`;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
      next();
    }
  });
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});