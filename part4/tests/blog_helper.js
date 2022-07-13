const Blogs = require("../models/blogs");

const testBlogs = [
  {
    title: "Blog",
    author: "Ben",
    url: "url1",
    likes: 3,
  },
  {
    title: "Gatsby",
    author: "Jon",
    url: "url2",
    likes: 3,
  },
];

const nonExistingId = async () => {
  const blog = new Blogs({
    title: "bye",
    author: "me",
    url: "url0",
    likes: 2,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blogs.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  testBlogs,
  nonExistingId,
  blogsInDb,
};
