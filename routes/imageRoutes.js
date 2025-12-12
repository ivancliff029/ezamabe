import express from "express";
import { upload } from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadImage, getImages } from "../controllers/imageController.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), uploadImage);
router.get("/", getImages);

export default router;
