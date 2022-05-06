// the way our data is structured
const db = require("../config/db.config.js");

class User {
  constructor(id, email, phone_number) {
    this.id = id;
    this.email = email;
    this.phone_number = phone_number;
  }
  static create(newUser, result) {
    db.query(
      `INSERT INTO users VALUES(?,?,?)`,
      [newUser.id, newUser.email, newUser.phone_number],
      (err, res) => {
        if (err) {
          console.log("error", err);
          result(err, null);
          return;
        }
        console.log("created user: ", { ...newUser });
        result(null, { id: res.insertId, ...newUser });
      }
    );
  }

  static findById(id, result) {
    db.query(`SELECT * FROM users WHERE user_id = ?`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  }

  static getAll(result) {
    db.query("SELECT * FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("users: ", res);
      result(null, res);
    });
  }
  static updateById(id, user, result) {
    db.query(
      "UPDATE users SET email = ?, phone_number = ? WHERE user_id = ?",
      [user.email, user.phone_number, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  }

  static delete(id, result) {
    db.query("DELETE FROM users WHERE user_id = ?", [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  }
}

module.exports = User;
