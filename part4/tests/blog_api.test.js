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

test("id is defined for each blogObject", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
}, 10000);

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
