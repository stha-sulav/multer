import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

/*
    @desc create user
    @route POST /api/v1/users/register
    @access Public
*/
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullname, password } = req.body;

  if (
    [username, email, fullname, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    throw new ApiError(400, "User with that email or username already exists");
  }

  const user = await User.create({ fullname, email, username, password });

  if (!user) {
    throw new ApiError(500, "Something went wrong");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, { fullname, email, username }, "User Created"));
});

/*
    @desc login user
    @route POST /api/v1/users/login
    @access Public
*/
const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "Username or email is required.");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const user = await User.findOne({ $or: [{ email }, { username }] });

  const isPasswordValid = await user.comparePassword(password);

  if (user && isPasswordValid) {
    const verifyedUser = await User.findById(user._id).select("-password");

    return res
      .status(200)
      .json(new ApiResponse(200, verifyedUser, "User Loggedin"));
  } else {
    throw new ApiError(400, "Invalid Credentials");
  }
});

export { registerUser, loginUser };
