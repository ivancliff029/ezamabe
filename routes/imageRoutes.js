import express from "express";
import { upload } from "../middleware/upload.js";
import { protect, superAdminOnly } from "../middleware/authMiddleware.js"; // Import both
import { uploadImage, getImages } from "../controllers/imageController.js";

const router = express.Router();

router.post("/", protect, superAdminOnly, upload.single("image"), uploadImage);

router.get("/", getImages);

export default router;