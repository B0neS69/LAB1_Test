const axios = require("axios");

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

describe("API Tests for JSONPlaceholder", () => {
  let newPostId;

  test("GET All Posts - should return array", async () => {
    const res = await axios.get(BASE_URL);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  test("GET Specific Post - should return a post object", async () => {
    const res = await axios.get(`${BASE_URL}/1`);
    expect(res.status).toBe(200);
    expect(res.data.id).toBe(1);
  });

  test("POST - should create a new post", async () => {
    const post = { title: "Test Post", body: "Test content", userId: 1 };
    const res = await axios.post(BASE_URL, post);
    expect(res.status).toBe(201);
    expect(res.data).toMatchObject(post);
    newPostId = res.data.id;
  });

  test("PUT - should update a post", async () => {
    const updated = { title: "Updated", body: "Updated body", userId: 1 };
    const res = await axios.put(`${BASE_URL}/1`, updated);
    expect(res.status).toBe(200);
    expect(res.data).toMatchObject(updated);
  });

  test("DELETE - should delete a post", async () => {
    const res = await axios.delete(`${BASE_URL}/1`);
    expect([200, 204]).toContain(res.status); // JSONPlaceholder returns 200
  });
});
