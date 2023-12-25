import { asyncHandler } from "../utils/asyncHandler";

/*
@desc get all Posts
@route GET /posts
@access Private
*/
const getAllPosts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "All good from all posts" });
});

/*
@desc get Posts by Id
@route GET /posts/:id
@access Private
*/
const getPost = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "All good from post by id" });
});

/*
@desc create Posts 
@route POST /posts/
@access Private
*/
const createPost = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "All good from create post" });
});

/*
@desc update Post
@route PUT /posts/:id
@access Private
*/
const updatePost = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "All good from update post" });
});

/*
@desc delete Post
@route DELETE /posts/:id
@access Private
*/
const deletePost = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "All good from delete post" });
});

export { getAllPosts, getPost, updatePost, deletePost, createPost };
