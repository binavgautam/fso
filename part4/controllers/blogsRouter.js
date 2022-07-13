const blogsRouter = require("express").Router();
const Blogs = require("../models/blogs");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blogs.find({});
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
  const blog = await Blogs.findById(request.params.id);
  blog ? response.json(blog) : response.status(404).end();
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const blog = new Blogs({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blogs.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const blog = await Blogs.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  });
  response.json(blog);
});

module.exports = blogsRouter;
