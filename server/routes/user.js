const express = require("express");
const router = express.Router();
const { getUser, getAllUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authmiddleware");

router.get("/", getAllUser);
router.get("/:id", authMiddleware, getUser);
//router.put("/login",authMiddleware, updateUser);

module.exports = router;
