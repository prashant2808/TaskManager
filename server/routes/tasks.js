const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });
const {
    createTask,
    fetchAll,
    addAttachments,
    deleteAttachment,
    fetchTask,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", fetchAll);
// router.get("/:id", fetchTask);
router.put("/:id", updateTask);
router.post("/:id/attachments", upload.single("file"), addAttachments);
router.delete("/:id/attachments/:attachment", deleteAttachment);

module.exports = router;
