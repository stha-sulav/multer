import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/*
@desc get all Posts
@route GET /posts
@access Private
*/
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fectched successfully"));
});

/*
@desc get Posts by Id
@route GET /posts/:id
@access Private
*/
const getPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById({ _id: postId });

  if (!post) {
    throw new ApiError(404, "404 Not Found");
  }

  res.status(200).json(new ApiResponse(200, post, "Post found"));
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
      return uploadPost;
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
  const { postId } = req.params;
  const { caption } = req.body;

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const updatedPost = await Post.findByIdAndUpdate(
    post._id,
    { caption },
    { new: true }
  );

  if (!updatedPost) {
    throw new ApiError(400, "Canot update post");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedPost, "Successfully updated"));
});

/*
@desc delete Post
@route DELETE /posts/:id
@access Private
*/
const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "No posts found");
  }

  const isImagesDelete = await Promise.all(
    post?.images?.map(async (image) => {
      const isDeleted = await deleteFromCloudinary(image.image_id);
      if (isDeleted.result !== "ok") {
        return false;
      }
      return true;
    })
  );

  if (!isImagesDelete.every((result) => result === true)) {
    throw new ApiError(404, "No posts found");
  }

  const oldPost = await Post.findByIdAndDelete(post._id);

  if (!oldPost) {
    throw new ApiError(400, "Could not delete posts");
  }

  res.status(200).json(new ApiResponse(200, [], "Deleted successfully"));
});

/*
@desc delete Image
@route DELETE /posts/:id
@access Private
*/

// const deleteImage = asyncHandler(async (req, res) => {
//   const postId = req.params;
//   const {image_id} = req.body;

//   const post = await Post.findById(postId);

//   if (!post) {
//     throw new ApiError(404, "Post not found");
//   }

//   const updatedPost =

// });

export { getAllPosts, getPost, updatePost, deletePost, createPost };
