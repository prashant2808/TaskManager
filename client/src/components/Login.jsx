import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = ({ setAuth }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const loadingId = toast.loading("Logging In");
        try {
            const response = await axios.post("/api/auth/login", formData);

            //console.log("Login successfull");
            toast.success("Successfully logined", {
                id: loadingId,
                duration: 4000,
            });

            // Save the token based on rememberMe
            if (formData.rememberMe) {
                localStorage.setItem("token", response.data.token);
            } else {
                sessionStorage.setItem("token", response.data.token);
            }

            setLoading(false);
            setAuth(true);
            navigate("/");
        } catch (error) {
            console.error("Error logging in:", error.message);
            setLoading(false);
            toast.error(error.message, { id: loadingId });
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900">
                    Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.rememberMe}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    rememberMe: e.target.checked,
                                })
                            }
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm text-gray-900">
                            Remember Me
                        </label>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <small className="block text-center text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </a>
                </small>
            </div>
        </div>
    );
};

export default Login;

// <Box
//     display="flex"
//     flexDirection="column"
//     alignItems="center"
//     justifyContent="center"
//     // width={isSmallScreen ? "90vw" : "50vw"}
//     bgcolor="#fff"
//     borderRadius="1.2rem"
//     p="2rem"
//     data-aos="fade-left"
//     data-aos-easing="linear"
// >
//     <Box
//         component="form"
//         // onSubmit={handleSubmit}
//         display="flex"
//         flexDirection="column"
//         width="100%"
//     >
//         <Typography variant="h6" align="center" gutterBottom>
//             Login to your Account
//         </Typography>
//         <TextField
//             label="Email"
//             type="email"
//             name="email"
//             placeholder="Email"
//             // value={formData.email}
//             // onChange={handleChange}
//             margin="normal"
//             size="small"
//             // sx={{ fontSize: 10 }}
//             fullWidth
//         />
//         <TextField
//             label="Password"
//             type="password"
//             name="password"
//             placeholder="Password"
//             // value={formData.password}
//             // onChange={handleChange}
//             margin="normal"
//             size="small"
//             // sx={{ fontSize: 10 }}
//             fullWidth
//         />
//         <FormControlLabel
//             control={
//                 <Checkbox
//                     // checked={formData.rememberMe}
//                     // onChange={(e) =>
//                     //     setFormData({
//                     //         ...formData,
//                     //         rememberMe: e.target.checked,
//                     //     })
//                     // }
//                     name="rememberMe"
//                     color="primary"
//                 />
//             }
//             label="Remember Me"
//             sx={{ "& .MuiTypography-root": { fontSize: "0.875rem" } }}
//         />
//         <Button
//             type="submit"
//             variant="contained"
//             // sx={{ bgcolor: "primary.main", mt: 2 }}
//             // disabled={loading}
//             fullWidth
//         >
//             {/* {loading ? "Logging in ..." : "Login"} */}Login
//         </Button>
//         <Typography variant="body2" align="center" marginTop={2}>
//             Don&apos;t have an account?{" "}
//             <Link href="/register" color="primary.main">
//                 Register
//             </Link>
//         </Typography>
//     </Box>
// </Box>
