const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  // serve client page
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/locations", function (req, res) {
  //extract query term from request and add wildcard
  const query = `${req.query.q}%`;
  //open database connection
  const db = new sqlite3.Database("./db/geonames.db");
  // create sql query
  const sql = `SELECT * FROM locations WHERE name LIKE ?`;
  // perform db search
  db.all(sql, query, (err, row) => {
    if (err) {
      throw new Error(err.message);
    }
    return row
      ? res.send(row)
      : res.send(`No locations found with the name ${query}`);
  });

  // close the database connection
  db.close();
});

//start the app
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
