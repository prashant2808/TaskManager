import React, { useEffect, useState } from "react";

const Notifications = ({ notifications, closeNotify }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={closeNotify}
            ></div>
            <div className="bg-white p-6 rounded shadow-lg z-10 w-3/4 max-w-lg">
                <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                <ul className="divide-y divide-gray-200">
                    {notifications.map((notification) => (
                        <li
                            key={notification._id}
                            className="py-2 flex items-center"
                        >
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                {notification?.sender?.username
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </div>
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                    {notification.message}
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-sm text-gray-500">
                                        {new Date(
                                            notification.createdAt
                                        ).toLocaleString()}
                                    </div>
                                    <div className="text-sm font-semibold text-gray-700">
                                        - {notification?.sender?.username}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={closeNotify}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Notifications;
