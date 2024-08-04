import React, { useState } from "react";

const GroupModal = ({ isOpen, onRequestClose, users, onCreateGroup }) => {
    const [groupName, setGroupName] = useState("");
    const [selectedMembers, setSelectedMembers] = useState([]);

    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value);
    };

    const handleMemberChange = (e) => {
        const value = e.target.value;
        setSelectedMembers((prevState) =>
            prevState.includes(value)
                ? prevState.filter((id) => id !== value)
                : [...prevState, value]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateGroup(groupName, selectedMembers);
        setGroupName("");
        setSelectedMembers([]);
        onRequestClose();
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div
                    className="absolute inset-0 bg-black opacity-50"
                    onClick={onRequestClose}
                ></div>
                <div className="bg-white p-6 rounded shadow-lg z-10">
                    <h2 className="text-2xl font-semibold mb-4">
                        Create Group
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Group Name
                            </label>
                            <input
                                type="text"
                                value={groupName}
                                onChange={handleGroupNameChange}
                                className="mt-1 block w-full border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Members
                            </label>
                            {users?.map((user) => (
                                <div
                                    key={user?._id}
                                    className="flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        value={user._id}
                                        checked={selectedMembers.includes(
                                            user._id
                                        )}
                                        onChange={handleMemberChange}
                                        className="mr-2"
                                    />
                                    <label>{user.email}</label>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={onRequestClose}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default GroupModal;
