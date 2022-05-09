// a controller file is going to be the one  that is going to talk to our route
const User = require("../models/user.model");

//create a new user
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "user content can not be empty",
    });
  }

  //   create a user
  const { user_id, email, phone_number } = req.body;
  const user = new User(user_id, email, phone_number);

  //   Save user in the dataase
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  User.findById(Number(req.params.id), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "user content can not be empty",
    });
  }
  const { id, email, phone_number } = req.body;
  User.updateById(
    Number(req.params.id),
    new User(id, email, phone_number),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  User.delete(Number(req.params.id), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete user with id " + req.params.id,
        });
      }
    } else res.send({ message: `user was deleted successfully!` });
  });
};
