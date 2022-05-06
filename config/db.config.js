// this is where we create a db conncertion
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Abelkibebenegash123",
  database: "sidehustle",
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = connection;
