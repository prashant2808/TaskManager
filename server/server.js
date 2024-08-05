// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

//Routes
const authRoutes = require("./routes/auth");
const tasksRoutes = require("./routes/tasks");
const groupsRoutes = require("./routes/groups");
const usersRoutes = require("./routes/user");
const testRoutes = require("./routes/test");
const notiRoutes = require("./routes/notification");

const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// MongoDB connection
connectDB();

//Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ["https://task-manager-mysite.netlify.app","http://localhost:5173", "http://localhost:5174"],
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these methods
        allowedHeaders: "Content-Type,Authorization",
        optionsSuccessStatus: 200// Allow these headers
    })
);
app.use((req, res, next) => {
    console.log('CORS Headers:', res.get('Access-Control-Allow-Origin'));
    next();
  });
  

// Define routes
app.use("/", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/notifications", notiRoutes);
app.use("/api/groups", groupsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
