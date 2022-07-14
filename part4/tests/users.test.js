const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/users");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({
    username: "root",
    passwordHash,
  });

  await user.save();
}, 100000);

describe("user", () => {
  test("new username", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "bin",
      password: "bin",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("existing username", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "root",
      password: "root",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
