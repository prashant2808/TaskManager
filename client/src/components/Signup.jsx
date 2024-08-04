import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm: "",
        recaptchaToken: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingId = toast.loading("Creating account...");

        setLoading(true);
        try {
            const response = await axios.post("/api/auth/signup", formData);
            // console.log("Registration successful:", response);
            toast.success("Registration successful", {
                id: loadingId,
                duration: 4000,
            });
            setLoading(false);
            navigate("/login");
        } catch (error) {
            console.error("Error registering user:", error.message);
            toast.error("Registration failed", { id: loadingId });
        }
        setLoading(false);
    };

    // const handleRecaptchaChange = (token) => {
    //     setFormData({
    //         ...formData,
    //         recaptchaToken: token,
    //     });
    // };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900">
                    Sign up
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="confirm"
                            placeholder="Confirm Password"
                            value={formData.confirm}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
                        />
                    </div>
                    {/* <div className="flex justify-center ">
                        <ReCAPTCHA
                            sitekey="6LdHLh0qAAAAAJ85ugqiKhARcbzS2T3_h6jzX-xL" //{process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                            onChange={handleRecaptchaChange}
                        />
                    </div> */}
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <small className="block text-center text-gray-600 text-sm">
                    Already registered?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </small>
            </div>
        </div>
    );
};

export default Signup;
