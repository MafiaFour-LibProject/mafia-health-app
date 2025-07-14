import { apiClient } from "./config";

// Get all blog posts

export const getAllBlogs = async () => {
  const res = await apiClient.get("/fake-data/blogs.json");
  return res.data;
};

// Get single blog post

export const getSingleBlog = async (id) => {
  const res = await apiClient.get("/fake-data/blogs.json");
  return res.data.find((blog) => blog._id === id);
};

/* Replace later with:
GET /blogs
GET /blogs/:id
*/
