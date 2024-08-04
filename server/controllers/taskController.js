const Task = require("../models/task");
const Notification = require("../models/notification");
const fs = require("fs");
const path = require("path");

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();

        // Generate a notification for the assignee
        if (task.assignedTo) {
            const notification = new Notification({
                recipient: task.assignedTo,
                sender: task.createdBy,
                message: `You have been assigned a new task: ${task.title}`,
            });
            await notification.save();
        }

        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all tasks
exports.fetchAll = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("createdBy", "email username")
            .populate("assignedTo", "email username");
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get task by ID
exports.fetchTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update task by ID
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
            .populate("createdBy", "email username")
            .populate("assignedTo", "email username");
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        // If task status is 'completed', send a notification to the creator
        if (task.status === "completed") {
            const notification = new Notification({
                recipient: task.createdBy,
                sender: task.assignedTo,
                message: `The task "${task.title}" has been completed.`,
            });
            await notification.save();
        }

        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//add attachment by id
exports.addAttachments = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        task.attachments.push(req.file.filename);
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteAttachment = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        const attachmentPath = path.join("uploads", req.params.attachment);

        // Remove attachment from file system
        if (fs.existsSync(attachmentPath)) {
            fs.unlinkSync(attachmentPath);
        }

        // Remove attachment from the task's attachments array
        task.attachments = task.attachments.filter(
            (att) => att !== req.params.attachment
        );
        await task.save();

        res.status(200).json({ message: "Attachment deleted successfully" });
        await task.save();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete task by ID
// exports.deleteTask = async (req, res) => {
//     try {
//         const task = await Task.findByIdAndDelete(req.params.id);
//         if (!task) {
//             return res.status(404).json({ error: "Task not found" });
//         }
//         res.json({ message: "Task deleted successfully" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
