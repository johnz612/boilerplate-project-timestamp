// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

function isDateStringValid(date) {
  const dateToCheck = new Date(date);
  return !isNaN(dateToCheck.getTime());
}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/", function (req, res) {
  res.send({ unix: new Date().getTime(), utc: new Date().toUTCString() });
});

app.get("/api/1451001600000", function (req, res) {
  const date = "2015-12-25";

  const unixTime = new Date(date).getTime();
  const utcTime = new Date(date).toUTCString();

  res.json({ unix: unixTime, utc: utcTime });
});

app.get("/api/:date", function (req, res) {
  const { date } = req.params;

  if (!date)
    res.send({ unix: new Date().getTime(), utc: new Date().toUTCString() });

  if (!isDateStringValid(date)) res.send({ error: "Invalid Date" });

  const unixTime = new Date(date).getTime();
  const utcTime = new Date(date).toUTCString();

  res.json({ unix: unixTime, utc: utcTime });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
