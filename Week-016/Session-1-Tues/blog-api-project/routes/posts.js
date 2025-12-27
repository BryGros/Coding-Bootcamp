const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

// localhost:3000/api/posts
router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post("/", postsController.createPost);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);

module.exports = router;
