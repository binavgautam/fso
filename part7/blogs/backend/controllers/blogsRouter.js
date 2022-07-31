const blogsRouter = require("express").Router();
const Blogs = require("../models/blogs");
const Users = require("../models/users");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("Authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blogs.find({}).populate("user", { username: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
  const blog = await Blogs.findById(request.params.id);
  blog ? response.json(blog) : response.status(404).end();
});

blogsRouter.get("/:id/comments", async (request, response) => {
  const blog = await Blogs.findById(request.params.id);
  blog ? response.json(blog.comments) : response.status(404).end();
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await Users.findById(decodedToken.id);

  const blog = new Blogs({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0,
    comments: [],
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;
  console.log("router");
  console.log(body.comment);
  const blog = await Blogs.findById(request.params.id);
  const updatedBlog = {
    ...blog,
    comments: blog.comments.push(body.comment),
  };
  await Blogs.findByIdAndUpdate(request.params.id, updatedBlog);
  response.status(201).end();
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blogs.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const blog = Blogs.findById(request.params.id);
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
  };
  const updatedBlog = await Blogs.findByIdAndUpdate(
    request.params.id,
    newBlog,
    { new: true }
  );
  response.json(updatedBlog);
});

blogsRouter.put("/:id/comments", async (request, response) => {
  const body = request.body;

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: [],
  };
  const updatedBlog = await Blogs.findByIdAndUpdate(
    request.params.id,
    newBlog,
    { new: true }
  );
  response.json(updatedBlog);
});

module.exports = blogsRouter;
