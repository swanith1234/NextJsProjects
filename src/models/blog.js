import mongoose from "mongoose";

// Define the schema
const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
});

// Check if the model already exists before defining it
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
