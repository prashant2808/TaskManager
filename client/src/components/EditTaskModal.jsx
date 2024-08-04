import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditTaskModal = ({
    users,
    isOpen,
    userId,
    taskId,
    onClose,
    setTaskUpdated,
}) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        assignedTo: "",
        priority: "medium",
        deadline: "",
    });

    // useEffect(() => {
    //     const fetchTask = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `http://localhost:5000/api/tasks/${taskId}`,
    //                 {
    //                     withCredentials: true,
    //                 }
    //             );
    //             setFormData(response.data);
    //         } catch (error) {
    //             console.error("Error fetching task:", error);
    //         }
    //     };

    //     fetchTask();
    // }, [taskId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTaskUpdated(false);
        const loadingId = toast.loading("Updating Task");
        try {
            await axios.put(`/api/tasks/${taskId}`, formData, {
                withCredentials: true,
            });

            setTaskUpdated(true);
            toast.success("Task updated sucessfully", {
                id: loadingId,
                duration: 4000,
            });
            onClose();
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Error while updating", {
                id: loadingId,
                duration: 4000,
            });
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-lg">
                    <h2 className="text-lg font-bold mb-4">Edit Task</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mb-2 p-2 border rounded w-full"
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mb-2 p-2 border rounded w-full"
                        />
                        <select
                            name="assignedTo"
                            value={formData.assignedTo}
                            onChange={handleChange}
                            className="mb-2 p-2 border rounded w-full"
                        >
                            <option value="">Select Asignee</option>
                            {users?.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {userId === user._id ? "Self" : user.email}
                                </option>
                            ))}
                        </select>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="mb-2 p-2 border rounded w-full"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="mb-2 p-2 border rounded w-full"
                        />
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default EditTaskModal;
