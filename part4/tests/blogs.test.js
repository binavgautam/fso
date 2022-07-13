const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blogs = require("../models/blogs");
const helper = require("./blog_helper");
const api = supertest(app);

const blogs = helper.testBlogs;

beforeEach(async () => {
  await Blogs.deleteMany({});
  await Blogs.insertMany(blogs);
});

describe("initial", () => {
  //4.8
  test("blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(blogs.length);
  });

  //4.9
  test("property id exists", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
}, 100000);

describe("testBlogs", () => {
  test("there are two blogs", async () => {
    const res = await api.get("/api/blogs");
    expect(res.body).toHaveLength(blogs.length);
  });

  test("the first blog is Blog", async () => {
    const response = await helper.blogsInDb();
    console.log(response);
    expect(response[0].title).toBe(blogs[0].title);
  });

  test("blogs has Blog", async () => {
    const response = await helper.blogsInDb();
    const titles = response.map((r) => r.title);
    expect(titles).toContain("Blog");
  });
});

describe("viewingBlogs", () => {
  test("viewing valid id", async () => {
    const blogs = await helper.blogsInDb();
    console.log(blogs);
    const blog = blogs[0];
    console;
    const id = blog.id;
    console.log(id);
    const response = await api
      .get(`/api/blogs/${id}`)
      .expect(200)
      .expect("Content-type", /application\/json/);
    console.log(response.body);
    const processed = JSON.parse(JSON.stringify(blog));

    expect(response.body).toEqual(processed);
  });

  test("viewing non existent id", async () => {
    const id = await helper.nonExistingId();
    await api.get(`/api/blogs/${id}`).expect(404);
  });

  test("viewing invalid id", async () => {
    const id = "5a3d5da59070081a82a3445";
    await api.get(`/api/blogs/${id}`).expect(400);
  });
});

describe("addingBlogs", () => {
  //4.10
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "BlogXD",
      author: "BenXD",
      url: "benblogXD",
      likes: 6,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogs.length + 1);

    const contents = blogsAtEnd.map((b) => b.title);
    expect(contents).toContain("BlogXD");
  });

  //4.11
  test("blog without likes is added as 0", async () => {
    const newBlog = {
      title: "BenXD",
      author: "BenXD",
      url: "uwl",
    };

    await api.post("/api/blogs").send(newBlog).expect(201);

    const response = await helper.blogsInDb();
    const likes = response.map((r) => r.likes);

    expect(likes).toContain(0);
  });
  //4.12
  test("blog without title is not added", async () => {
    const newBlog = {
      author: "BenXD",
      url: "benblogXD",
      likes: 6,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const response = await helper.blogsInDb();

    expect(response).toHaveLength(blogs.length);
  });

  test("blog without url is not added", async () => {
    const newBlog = {
      title: "BenXD",
      author: "BenXD",
      likes: 6,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const response = await helper.blogsInDb();

    expect(response).toHaveLength(blogs.length);
  });
});

//4.13
describe("deletingBlogs", () => {
  test("valid id", async () => {
    const blogs = await helper.blogsInDb();
    const blogToDelete = blogs[0];
    const id = blogs[0].id;
    await api.delete(`/api/blogs/${id}`).expect(204);

    const blogsNew = await helper.blogsInDb();
    expect(blogsNew).toHaveLength(blogs.length - 1);

    const titles = blogsNew.map((b) => b.title);
    expect(titles).not.toContain(blogToDelete.content);
  });

  test("invalid id", async () => {
    const id = "5a3d5da59070081a82a344";
    await api.delete(`/api/blogs/${id}`).expect(400);
  });

  test("non existent id", async () => {
    const id = await helper.nonExistingId();
    await api.delete(`/api/blogs/${id}`).expect(204);
  });
});

//4.14
describe("updatingBlogs", () => {
  test("updating", async () => {
    const blogs = await helper.blogsInDb();
    const id = blogs[0].id;

    const newBlog = {
      title: "Blog",
      author: "Ben",
      url: "url1",
      likes: 6,
    };

    const upBlog = await api
      .put(`/api/blogs/${id}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogs.length);
    expect(upBlog.body.likes).toBe(6);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
