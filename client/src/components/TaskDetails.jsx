import React, { useState, useEffect } from "react";

import EditTaskModal from "./EditTaskModal";

const TaskDetails = ({
    users,
    tasks,
    userId,
    setTaskUpdated,
    getRandomColorClass,
}) => {
    // console.log({ tasks });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [taskId, setTaskId] = useState("");

    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    const handleEdit = (tid) => {
        setIsEditModalOpen(true);
        setTaskId(tid);
    };

    return (
        <div className="overflow-x-auto p-6 my-5 bg-white shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">All Tasks</h3>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Created By</th>
                        <th className="px-4 py-2 border">Assigned To</th>
                        <th className="px-4 py-2 border">Priority</th>
                        <th className="px-4 py-2 border">Deadline</th>
                        <th className="px-4 py-2 border">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks?.map((task) => (
                        <tr key={task._id} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border">{task.title}</td>
                            <td className="px-4 py-2 border">
                                {task.createdBy.email}
                            </td>
                            <td className="flex gap-2 px-4 py-2 border items-center">
                                <div
                                    className={`flex-shrink-0 h-8 w-8 rounded-full ${getRandomColorClass()} flex items-center justify-center text-white`}
                                >
                                    {task.assignedTo?.username
                                        .slice(0, 2)
                                        .toUpperCase()}
                                </div>
                                {task.assignedTo?.username}
                            </td>

                            <td className="px-4 py-2 border">
                                {task.priority}
                            </td>
                            <td className="px-4 py-2 border">
                                {new Date(task.deadline).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2 border">
                                <span
                                    className={`text-sm font-medium rounded-md p-1 ${
                                        task.status === "completed"
                                            ? "text-green-500 bg-green-100"
                                            : task.status === "in progress"
                                            ? "text-yellow-500 bg-yellow-100"
                                            : "text-red-500 bg-red-100"
                                    }`}
                                >
                                    {task.status}
                                </span>
                            </td>
                            <td className="px-4 py-2 border">
                                <button
                                    onClick={() => {
                                        handleEdit(task._id);
                                    }}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-auto"
                                    disabled={userId !== task?.createdBy?._id}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <EditTaskModal
                users={users}
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                taskId={taskId}
                userId={userId}
                tasks={tasks}
                setTaskUpdated={setTaskUpdated}
            />
        </div>
    );
};

export default TaskDetails;
