import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const TaskList = ({ tasks, userId, onUpdate }) => {
    const [file, setFile] = useState(null);

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await axios.put(
                `/api/tasks/${taskId}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            toast.success("Status updated");
            onUpdate(); // Call a prop function to refresh the task list
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAddAttachment = async (taskId) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post(`/api/tasks/${taskId}/attachments`, formData);
            setFile(null);
            toast.success("Attachment added");
            onUpdate(); // Call a prop function to refresh the task list
        } catch (error) {
            console.error("Error adding attachment:", error);
            toast.error("File not attached");
        }
    };

    const handleDeleteAttachment = async (taskId, attachment) => {
        try {
            await axios.delete(
                `/api/tasks/${taskId}/attachments/${attachment}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            onUpdate(); // Call a prop function to refresh the task list
        } catch (error) {
            console.error("Error deleting attachment:", error);
        }
    };

    return (
        <div className="p-6 my-5 bg-white shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">My Tasks</h3>
            <ul className="space-y-2">
                {tasks?.map(
                    (task) =>
                        task.assignedTo._id === userId && (
                            <li
                                key={task._id}
                                className="p-4 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <span className="font-medium">
                                            {task.title}
                                        </span>
                                        <span
                                            className={`text-sm font-medium rounded-md p-1 ${
                                                task.status === "completed"
                                                    ? "text-green-500 bg-green-100"
                                                    : task.status ===
                                                      "in progress"
                                                    ? "text-yellow-500 bg-yellow-100"
                                                    : "text-red-500 bg-red-100"
                                            }`}
                                        >
                                            {task.status}
                                        </span>
                                    </div>

                                    <span className="text-sm">
                                        <select
                                            value={task.status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    task._id,
                                                    e.target.value
                                                )
                                            }
                                            className={`text-sm `}
                                        >
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="in progress">
                                                In Progress
                                            </option>
                                            <option value="completed">
                                                Completed
                                            </option>
                                        </select>
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="text-sm"
                                    />
                                    <button
                                        onClick={() =>
                                            handleAddAttachment(task._id)
                                        }
                                        className="ml-2 px-2 py-1 bg-blue-500 text-sm text-white rounded hover:bg-blue-700"
                                    >
                                        Add Attachment
                                    </button>
                                </div>
                                <div className="mt-2">
                                    <ul>
                                        {task.attachments.map((attachment) => (
                                            <li
                                                key={attachment}
                                                className="flex justify-between items-center text-sm my-1"
                                            >
                                                <a
                                                    href={attachment}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {attachment}
                                                </a>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteAttachment(
                                                            task._id,
                                                            attachment
                                                        )
                                                    }
                                                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        )
                )}
            </ul>
        </div>
    );
};

export default TaskList;
