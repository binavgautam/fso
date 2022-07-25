const testingRouter = require("express").Router();
const Blogs = require("../models/blogs");
const Users = require("../models/users");

testingRouter.post("/reset", async (request, response) => {
  await Blogs.deleteMany({});
  await Users.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;
