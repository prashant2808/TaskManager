const Group = require("../models/group");

exports.createGroup = async (req, res) => {
    try {
        const { name, members, createdBy } = req.body;

        // Check if group name is provided
        if (!name) {
            return res.status(400).json({ error: "Group name is required" });
        }

        // Check if the creator is provided
        if (!createdBy) {
            return res.status(400).json({ error: "Creator is required" });
        }

        // Generate a unique invite link (you can customize this part as needed)
        //const inviteLink = `${req.protocol}://${req.get('host')}/api/groups/join/${Date.now()}`;

        // Create the new group
        const newGroup = new Group({
            name,
            members,
            createdBy,
        });

        await newGroup.save();

        res.status(201).json(newGroup);
    } catch (error) {
        console.error("Error creating group:", error);
        res.status(500).json({ error: "Server error" });
    }
};

//fetch groups
exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find().populate("members", "email username"); // Populate members with user details
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add member
exports.joinGroup = async (req, res) => {
    try {
        const { groupId, userId } = req.params;

        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        // Check if user is already a member
        if (group.members.includes(userId)) {
            return res.status(400).json({ error: "User is already a member" });
        }

        // Add the user to the group's members array
        group.members.push(userId);

        // Save the updated group
        await group.save();

        res.status(200).json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
