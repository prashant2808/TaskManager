import React, { useState, useEffect } from "react";
import axios from "axios";

import { AiOutlineLogout } from "react-icons/ai";

import TaskList from "./TaskList";
import GroupList from "./GroupList";
import TaskModal from "./TaskModal";
import TaskDetails from "./TaskDetails";
import Notifications from "./Notification";

const randomColorClass = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-lime-500",
    "bg-teal-500",
    "bg-purple-500",
];

const Home = ({ user, handleLogout, notifications }) => {
    const [users, setUsers] = useState({}); //All users
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isnotifyOpen, setIsNotifyOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskCreated, setTaskCreated] = useState(false);
    const [taskUpdated, setTaskUpdated] = useState(false);

    const [isSelected, setIsSelected] = useState("dashboard");
    // const navigate = useNavigate();

    const notificationCount = notifications ? notifications.length : 0;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openNotify = () => setIsNotifyOpen(true);
    const closeNotify = () => setIsNotifyOpen(false);
    const onUpdate = () => setTaskUpdated((prv) => !prv);

    const avatarAlpha = user?.username ? user?.username.slice(0, 2) : "";

    const getRandomColorClass = () => {
        const randomIndex = Math.floor(Math.random() * randomColorClass.length);
        return randomColorClass[randomIndex];
    };

    //fetching all user
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/users", {
                    withCredentials: true,
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    //fetching all tasks
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("/api/tasks", {
                    withCredentials: true,
                });

                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [setTasks, taskCreated, setTaskCreated, taskUpdated, setTaskUpdated]);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <header className="mx-2 mb-4 mt-2 bg-white text-slate-800 p-4 rounded-lg shadow-md flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-500">
                    Task Management System
                </h1>
                <div className="flex items-center space-x-4">
                    <AiOutlineLogout
                        onClick={handleLogout}
                        className="text-3xl font-bold text-red-500 hover:text-red-800"
                    />

                    <div
                        className={`${getRandomColorClass()} w-10 h-10 flex items-center justify-center text-white rounded-full font-bold text-lg`}
                    >
                        {avatarAlpha}
                    </div>
                </div>
            </header>

            <div className="flex flex-1 rounded-lg shadow-lg">
                <aside className="w-48 bg-white p-4 border-r ml-2 mb-6 shadow-lg rounded-lg">
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => setIsSelected("dashboard")}
                                className={`${
                                    isSelected === "dashboard"
                                        ? "bg-gray-200"
                                        : ""
                                } block hover:bg-gray-300 p-2 rounded relative w-full text-left`}
                            >
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setIsSelected("tasks")}
                                className={`${
                                    isSelected === "tasks" ? "bg-gray-200" : ""
                                } block hover:bg-gray-300 p-2 rounded relative w-full text-left`}
                            >
                                Tasks
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setIsSelected("mytasks")}
                                className={`${
                                    isSelected === "mytasks"
                                        ? "bg-gray-200"
                                        : ""
                                } block hover:bg-gray-300 p-2 rounded relative w-full text-left`}
                            >
                                My Tasks
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setIsSelected("groups")}
                                className={`${
                                    isSelected === "groups" ? "bg-gray-200" : ""
                                } block hover:bg-gray-300 p-2 rounded relative w-full text-left`}
                            >
                                Groups
                            </button>
                        </li>
                        <li className="relative inline-block">
                            <button
                                onClick={openNotify}
                                className="block hover:bg-gray-300 p-2 rounded relative w-full text-left"
                            >
                                Notifications
                            </button>
                            {notificationCount > 0 && (
                                <span className="bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs absolute -top-2 -right-2">
                                    {notificationCount}
                                </span>
                            )}
                            {isnotifyOpen && (
                                <Notifications
                                    notifications={notifications}
                                    closeNotify={closeNotify}
                                />
                            )}
                        </li>
                    </ul>
                </aside>
                <main className="flex-1 p-5 bg-gray-100">
                    <button
                        onClick={openModal}
                        className="w-32 h-32 bg-white text-slate-700 text-4xl flex items-center justify-center rounded-lg shadow-lg hover:bg-slate-100 transition-colors"
                    >
                        +
                    </button>
                    <TaskModal
                        users={users}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        userId={user?._id}
                        setTaskCreated={setTaskCreated}
                    />
                    {isSelected === "dashboard" && (
                        <>
                            <TaskDetails
                                users={users}
                                tasks={tasks}
                                userId={user?._id}
                                setTaskUpdated={setTaskUpdated}
                                getRandomColorClass={getRandomColorClass}
                            />
                            <TaskList
                                tasks={tasks}
                                userId={user?._id}
                                onUpdate={onUpdate}
                            />
                            <GroupList users={users} userId={user?._id} />
                        </>
                    )}
                    {isSelected === "mytasks" && (
                        <>
                            <TaskList
                                tasks={tasks}
                                userId={user?._id}
                                onUpdate={onUpdate}
                            />
                        </>
                    )}
                    {isSelected === "groups" && (
                        <>
                            <GroupList users={users} userId={user?._id} />
                        </>
                    )}
                    {isSelected === "tasks" && (
                        <>
                            <TaskDetails
                                users={users}
                                tasks={tasks}
                                userId={user?._id}
                                setTaskUpdated={setTaskUpdated}
                                getRandomColorClass={getRandomColorClass}
                            />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Home;
