const User = require("../models/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
    //     // const response = await axios.post(
    //     //     `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
    //     // );

    //     if (!response.data.success) {
    //         return res
    //             .status(400)
    //             .json({ error: "reCAPTCHA verification failed" });
    //     }

        const user = new User({ username, email, password });
        await user.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        res.status(400).send("Error registering user: " + error.message);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await User.findOne({ email });

        console.log('user =', user);

        if (!user) {
            return res.status(400).send("User not found");
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send("Invalid credentials");
        }
        // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        //     expiresIn: "1h",
        // });
        const token = jwt.sign(
            { userId: user._id, userEmail: user.email },
            process.env.JWT_SECRET
        );
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).send("Error logging in: " + error.message);
    }
};
