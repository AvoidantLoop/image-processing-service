const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const upload = require("../middleware/upload");
const { uploadImage, getImages, deleteImage, transformImageController ,getTransforms} = require("../controllers/imageController");
const { validate, transformSchema } = require("../middleware/validate");

// all routes are protected — must be logged in
router.post("/", protect, upload.single("image"), uploadImage);
router.get("/", protect, getImages);
router.delete("/:id", protect, deleteImage);
router.post("/:id/transform", protect, validate(transformSchema), transformImageController)
router.get("/:id/transforms", protect, getTransforms);

module.exports = router;