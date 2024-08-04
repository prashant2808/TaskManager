import React, { useState, useEffect } from "react";
import GroupModal from "./GroupModal";
import axios from "axios";
import { toast } from "react-hot-toast";

const GroupList = ({ users, userId }) => {
    // Placeholder for group data
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [isGroupCreated, setIsGroupCreated] = useState(false);
    const [groups, setGroups] = useState([]);

    const openModal = () => setIsGroupModalOpen(true);
    const closeModal = () => setIsGroupModalOpen(false);

    const handleCreateGroup = async (groupName, selectedMembers) => {
        try {
            setIsGroupCreated(false);
            const response = await axios.post("/api/groups", {
                name: groupName,
                members: selectedMembers,
                createdBy: userId,
            });
            if (response.status === 201) {
                // Assuming you have a function to fetch and update the groups list
                // fetchGroups();
                toast.success("Group created successfully", { duration: 4000 });
            }
            setIsGroupCreated(true);
        } catch (error) {
            console.error("Error creating group:", error);
            toast.error("Failed to create group");
        }
    };

    const handleJoinGroup = async (groupId) => {
        try {
            const response = await axios.put(
                `/api/groups/${groupId}/${userId}`
            );
            // console.log("Group joined successfully:", response.data);
            toast.success("You have been added to a group", { duration: 4000 });
            setIsGroupCreated((prv) => !prv); //for updating the groups
        } catch (error) {
            toast.error("You are already a member", { duration: 4000 });
        }
    };

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get("/api/groups");
                // console.log("Groups", response.data);
                setGroups(response.data);
            } catch (error) {
                console.error("Failed to fetch groups:", error);
            }
        };
        fetchGroups();
    }, [setGroups, isGroupCreated, setIsGroupCreated]);

    return (
        <div className="p-6 bg-white shadow-md rounded-lg mt-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">Groups</h3>
                <button
                    onClick={openModal}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                    Create Group
                </button>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groups.map((group) => (
                    <li
                        key={group._id}
                        className="flex flex-col bg-white p-6 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex-1 mb-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">
                                    {group.name}
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {group.members.length} members
                                </span>
                            </div>
                            <div className="mt-2">
                                <h4 className="font-medium text-gray-700">
                                    Members:
                                </h4>
                                <ul className="list-disc pl-5">
                                    {group.members.map((member) => (
                                        <li
                                            key={member._id}
                                            className="text-gray-600"
                                        >
                                            {member.username}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <button
                            className="mt-auto w-full py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 "
                            onClick={() => handleJoinGroup(group._id)}
                        >
                            Join Group
                        </button>
                    </li>
                ))}
            </ul>

            <GroupModal
                isOpen={isGroupModalOpen}
                onRequestClose={closeModal}
                users={users}
                onCreateGroup={handleCreateGroup}
            />
        </div>
    );
};

export default GroupList;
