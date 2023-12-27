import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPost,
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middlware.js";

const router = Router();

router
  .route("/")
  .get(getAllPosts)
  .post(upload.fields([{ name: "posts", maxCount: 8 }]), createPost);

router.get("/:postId", getPost);

export default router;
