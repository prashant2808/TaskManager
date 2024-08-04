import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
    const [isAuth, setAuth] = useState(
        !!localStorage.getItem("token") || !!sessionStorage.getItem("token")
    );
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserData = async () => {
            if (isAuth) {
                const token =
                    localStorage.getItem("token") ||
                    sessionStorage.getItem("token");

                //decoding the token
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;

                try {
                    const response = await axios.get(`/api/users/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                    setAuth(false);
                }
            }
        };
        fetchUserData();
    }, [isAuth]);

    //fetch the notification by id
    useEffect(() => {
        const fetchNotifications = async () => {
            if (isAuth) {
                const token =
                    localStorage.getItem("token") ||
                    sessionStorage.getItem("token");

                //decoding the token
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;
                try {
                    const response = await axios.get(
                        `/api/notifications/${userId}`,
                        {
                            withCredentials: true,
                        }
                    );
                    setNotifications(response.data);
                } catch (error) {
                    console.error("Error fetching notifications:", error);
                }
            }
        };

        fetchNotifications();
    }, [setNotifications, isAuth]);

    // useEffect(() => {
    //     if (isAuth && location.pathname !== '/') {
    //         navigate("/");
    //     }
    // }, [isAuth]);

    //console.log({ user, notifications });

    const handleLogout = () => {
        setUser(null);
        setAuth(false);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="w-full">
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login setAuth={setAuth} />} />
                {isAuth && user ? (
                    <Route
                        path="/"
                        element={
                            <Home
                                user={user}
                                handleLogout={handleLogout}
                                notifications={notifications}
                            />
                        }
                    />
                ) : (
                    <Route path="*" element={<Login setAuth={setAuth} />} />
                )}
            </Routes>
            <Toaster position="top-center" />
        </div>
    );
}

export default App;
