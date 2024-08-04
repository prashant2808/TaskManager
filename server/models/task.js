// Task Schema
const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            enum: ["pending", "in progress", "completed"],
            default: "pending",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        deadline: {
            type: Date,
        },
        attachments: [
            {
                type: String, // URL or file path
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
