const express = require("express");
const router = express.Router();
const Notification = require("../models/notification");

router.get("/:id", async (req, res) => {
    try {
        const notifications = await Notification.find({
            recipient: req.params.id,
        })
            .sort({ createdAt: -1 })
            .populate({
                path: "sender", // The field in the Notification model that references the User
                select: "email username", // Fields to include from the User model
            });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
