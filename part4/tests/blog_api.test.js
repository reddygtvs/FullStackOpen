const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/Blog");
const helper = require("../utils/list_helper");

const initialBlogs = helper.initialBlogs;
test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000);

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
}, 10000);

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[2]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[3]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[4]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[5]);
  await blogObject.save();
});

afterAll(async () => {
  await mongoose.connection.close();
});
