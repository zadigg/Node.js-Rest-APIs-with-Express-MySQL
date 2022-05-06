// routing file of our application

const router = require("express").Router();

const userController = require("../controllers/user.controllers");

module.exports = (app) => {
  // create a new user
  router.post("/", userController.create);

  //   find all users
  router.get("/", userController.findAll);

  //   find one user
  router.get("/:id", userController.findOne);

  //   update one user
  router.put("/:id", userController.update);

  //   delete one user
  router.delete("/:id", userController.delete);

  app.use("/api/users", router);
};
