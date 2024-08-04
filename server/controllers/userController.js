const User = require("../models/user");

//get user by id
exports.getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.json(`Error : ${error.message}`);
    }
};

//get all user
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find({}, "email"); // Adjust the fields as necessary
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
