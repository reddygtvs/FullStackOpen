const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  // const blog = new Blog(request.body);
  const blog = request.body;
  const user = await User.findById(blog.userId);
  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }
  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: user.id,
  });

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const blog = {
    likes: body.likes,
  };
  await Blog.findByIdAndUpdate(id, blog, { new: true });
  response.status(200).end();
});

module.exports = blogsRouter;
