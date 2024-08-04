import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const TaskModal = ({ users, isOpen, onClose, userId, setTaskCreated }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        assignedTo: "",
        status: "pending",
        priority: "medium",
        deadline: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTaskCreated(false);
        const loadingId = toast.loading("Creating Task");
        try {
            const response = await axios.post(
                "/api/tasks",
                {
                    ...formData,
                    createdBy: userId,
                },
                {
                    withCredentials: true,
                }
            );
            // console.log({ response });
            toast.success("Task created sucessfully", {
                id: loadingId,
                duration: 4000,
            });
            setTaskCreated(true);
            onClose(); // Close modal after successful submission
        } catch (error) {
            toast.error(error.message, { id: loadingId, duration: 4000 });
            console.error("Error creating task:", error);
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-semibold mb-4">Create Task</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Assigned To
                            </label>
                            <select
                                name="assignedTo"
                                value={formData.assignedTo}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select User</option>
                                {users?.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {userId === user._id
                                            ? "Self"
                                            : user.email}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="pending">Pending</option>
                                <option value="in progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Priority
                            </label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Deadline
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Create Task
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="ml-2 py-2 px-4 rounded border border-gray-300"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        )
    );
};

export default TaskModal;
