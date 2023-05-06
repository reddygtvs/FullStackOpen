const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/Blog");
const helper = require("../utils/list_helper");

const initialBlogs = helper.initialBlogs;
describe("when there is initially some blogs saved", () => {
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
});
describe("addition of a new blog", () => {
  test("HTTP Post request adds a new blog", async () => {
    const newBlog = {
      title: "Test Blog",
      author: "Test Author",
      url: "testurl.com",
      likes: 0,
    };

    await api.post("/api/blogs").send(newBlog);
    const response = await api.get("/api/blogs");
    const index = initialBlogs.length;
    expect(response.body).toHaveLength(index + 1);
    expect(response.body[index].title).toEqual(newBlog.title);
  });

  test("HTTP Post request sets likes to 0 if likes is not defined", async () => {
    const newBlog = {
      title: "Test Blog",
      author: "test author",
      url: "testurl.com",
    };
    await api.post("/api/blogs").send(newBlog);
    const response = await api.get("/api/blogs");
    const index = initialBlogs.length;
    expect(response.body[index].likes).toEqual(0);
  });

  test("HTTP Post request returns 400 if title and url are not defined", async () => {
    const newBlog = {};
    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});
describe("deletion of a blog", () => {
  test("HTTP Delete request deletes a blog", async () => {
    const response = await api.get("/api/blogs");
    const index = initialBlogs.length;
    const id = response.body[index - 1].id;
    await api.delete(`/api/blogs/${id}`).expect(204);
    const response2 = await api.get("/api/blogs");
    expect(response2.body).toHaveLength(index - 1);
  });
});

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
