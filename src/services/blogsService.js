import { apiClient } from "./config";

// Create blog
export const createBlog = async (blogData) => {
  const response = await apiClient.post("/api/blogs", blogData);
  return response.data;
};

// Get all blog posts
export const getBlogs = async (params = {}) => {
  const response = await apiClient.get("/api/blogs", { params });
  return response.data;
};

// Get blog by id
export const getBlogById = async (id) => {
  const response = await apiClient.get(`/api/blogs/${id}`);
  return response.data;
};

// Update blog
export const updateBlog = async (id, data) => {
  const res = await apiClient.put(`/api/blogs/${id}`, data);
  return res.data;
};

// Delete blog
export const deleteBlog = async (id) => {
  const res = await apiClient.delete(`/api/blogs/${id}`);
};
