import React, { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthDataContext } from "../context/Authcontext.jsx";
import { userDataContext } from "../context/Usercontext.jsx";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Login() {
const [showPassword, setShowPassword] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const navigate = useNavigate();

const authContext = useContext(AuthDataContext);
const userContext = useContext(userDataContext);

const serverUrl = authContext?.serverUrl;
const getCurrentUser = userContext?.getCurrentUser;

const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
        toast.error("Please enter your email and password.");
        return;
    }

    if (!serverUrl) {
        toast.error("Server URL is missing. Check Authcontext.jsx.");
        return;
    }

    try {
        setLoading(true);

        const response = await axios.post(
            `${serverUrl}/api/auth/login`,
            { email: email.trim(), password },
            { withCredentials: true }
        );

        toast.success("Login successful!");

        if (typeof getCurrentUser === "function") {
            try {
                await getCurrentUser();
            } catch (error) {
                console.error("Unable to refresh current user:", error);
            }
        }

        const role = response.data?.user?.role;

        setTimeout(() => {
            if (role === "provider") {
                navigate("/provider");
            } else {
                navigate("/user");
            }
        }, 700);

    } catch (error) {
        console.error("Login error:", error);
        toast.error(
            error?.response?.data?.message || "Login failed. Check your credentials and backend."
        );
    } finally {
        setLoading(false);
    }
};

return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

        {/* LEFT DESIGN SECTION */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-12">
            <div className="max-w-lg text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-600 text-4xl font-extrabold text-white shadow-xl shadow-blue-900/40">
                    SH
                </div>

                <h1 className="mb-4 text-4xl font-extrabold text-white">
                    Welcome to <span className="text-blue-400">ServiceHub</span>
                </h1>

                <p className="text-lg leading-8 text-slate-300">
                    Find trusted professionals for your everyday needs.
                    Log in to book services and manage your account.
                </p>
            </div>
        </div>

        {/* LOGIN FORM */}
        <div className="flex w-full md:w-1/2 items-center justify-center px-5 py-10">

            <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900/90 p-6 shadow-2xl sm:p-8">

                <div className="mb-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-extrabold text-white">
                        SH
                    </div>

                    <h2 className="text-3xl font-bold text-white">
                        Login
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        Sign in to your ServiceHub account
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">

                    {/* EMAIL */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Email address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-12 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />

                            <button
                                type="button"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 hover:text-white"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </button>
                        </div>
                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {/* SIGNUP */}
                    <p className="text-center text-sm text-slate-400">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            className="font-semibold text-blue-400 hover:text-blue-300"
                            onClick={() => navigate("/signup")}
                        >
                            Sign up
                        </button>
                    </p>

                    <button
                        type="button"
                        className="w-full rounded-xl border border-slate-700 py-3 text-sm text-slate-300 transition hover:bg-slate-800"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </button>

                </form>
            </div>
        </div>

        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
);


}

export default Login;
