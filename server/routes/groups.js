const express = require("express");
const router = express.Router();
const {
    createGroup,
    getGroups,
    joinGroup,
} = require("../controllers/groupController");

router.post("/", createGroup);
router.get("/", getGroups);
router.put("/:groupId/:userId", joinGroup);

module.exports = router;
