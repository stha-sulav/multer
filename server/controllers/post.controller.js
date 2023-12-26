import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
  const { files } = req;
  const { caption } = req.body;

  if (!files) {
    throw new ApiError(400, "Something went wrong while uploading files");
  }

  const postsArray = await Promise.all(
    files?.posts?.map(async (file) => {
      if (!file.path) {
        throw new ApiError(400, "Atleast one image need to be selected");
      }

      const uploadPost = await uploadOnCloudinary(file.path);

      if (!uploadPost) {
        throw new ApiError(400, "Atleast one image need to be selected");
      }
      return uploadPost.url;
    })
  );

  const newPost = await Post.create({
    caption: caption || "",
    images: postsArray,
  });

  if (!newPost) {
    throw new ApiError(400, "Couldnot uplod the post");
  }

  res.status(201).json(new ApiResponse(200, newPost, "Post added"));
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
