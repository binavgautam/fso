const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const Users = require("../models/users");

usersRouter.get("/", async (request, response) => {
  const users = await Users.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const existingUser = await Users.findOne({
    username,
  });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new Users({
    username,
    passwordHash,
  });

  const newUser = await user.save();
  response.status(201).json(newUser);
});

usersRouter.delete("/:id", async (request, response) => {
  await Users.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = usersRouter;
