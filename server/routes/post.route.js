import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middlware.js";

const router = Router();

router
  .route("/")
  .post(upload.fields([{ name: "posts", maxCount: 8 }]), createPost);

export default router;
