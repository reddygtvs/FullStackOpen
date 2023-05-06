const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    /* write a test that verifies that the blog list application returns the correct number of blog posts */
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000);

afterAll(async () => {
  await mongoose.connection.close();
});
