
import React, { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthDataContext } from "../context/Authcontext.jsx";
import { userDataContext } from "../context/Usercontext.jsx";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function Registeration() {
    const navigate = useNavigate();

    // Form states
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [loading, setLoading] = useState(false);

    // Context values
    const authContext = useContext(AuthDataContext);
    const userContext = useContext(userDataContext);

    const serverUrl = authContext?.serverUrl;
    const getCurrentUser = userContext?.getCurrentUser;

    // Registration handler
    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !password || !role) {
            toast.error("Please fill all fields");
            return;
        }

        if (!serverUrl) {
            toast.error(
                "Server URL is missing. Please check Authcontext.jsx."
            );
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                `${serverUrl}/api/auth/signup`,
                {
                    name: name.trim(),
                    email: email.trim(),
                    password,
                    role,
                },
                {
                    withCredentials: true,
                }
            );

            toast.success("Registration successful!");

            // Refresh current user if the context provides this function
            if (typeof getCurrentUser === "function") {
                try {
                    await getCurrentUser();
                } catch (error) {
                    console.error("getCurrentUser error:", error);
                }
            }

            const userRole = response?.data?.user?.role;

            setTimeout(() => {
                if (userRole === "provider") {
                    navigate("/provider");
                } else {
                    navigate("/user");
                }
            }, 1000);

        } catch (error) {
            console.error("Registration error:", error);

            toast.error(
                error?.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 md:flex-row">

            {/* LEFT SECTION */}
            <div className="hidden w-1/2 items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 p-10 md:flex">
                <div className="max-w-md text-center">
                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-600 text-4xl font-bold text-white shadow-xl">
                        SH
                    </div>

                    <h1 className="text-4xl font-bold text-blue-400">
                        Welcome to ServiceHub
                    </h1>

                    <p className="mt-4 leading-7 text-gray-300">
                        Find trusted professionals for your everyday needs.
                        Book reliable services quickly and easily.
                    </p>

                    <div className="mt-8 grid grid-cols-2 gap-4 text-left">
                        <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
                            <h3 className="font-semibold text-blue-400">
                                Trusted Services
                            </h3>
                            <p className="mt-2 text-sm text-gray-400">
                                Find professionals for your home.
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
                            <h3 className="font-semibold text-blue-400">
                                Easy Booking
                            </h3>
                            <p className="mt-2 text-sm text-gray-400">
                                Get started in just a few steps.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex w-full items-center justify-center px-4 py-10 md:w-1/2 md:px-6">

                <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900/90 p-6 shadow-2xl md:p-8">

                    {/* LOGO */}
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg">
                        SH
                    </div>

                    <h2 className="mb-2 text-center text-2xl font-bold text-blue-400">
                        Create Account
                    </h2>

                    <p className="mb-6 text-center text-sm text-gray-400">
                        Join ServiceHub today
                    </p>

                    <form onSubmit={handleRegister} className="space-y-4">

                        {/* NAME */}
                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                                required
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-gray-200 outline-none transition focus:border-blue-500"
                            />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-gray-200 outline-none transition focus:border-blue-500"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                    required
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-12 text-gray-200 outline-none transition focus:border-blue-500"
                                />

                                <button
                                    type="button"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    onClick={() =>
                                        setShowPassword((previous) => !previous)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-blue-400"
                                >
                                    {showPassword
                                        ? <IoEyeOffOutline />
                                        : <IoEyeOutline />}
                                </button>
                            </div>
                        </div>

                        {/* ROLE */}
                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Register As
                            </label>

                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-gray-200 outline-none transition focus:border-blue-500"
                            >
                                <option value="user">User</option>
                                <option value="provider">
                                    Service Provider
                                </option>
                            </select>
                        </div>

                        {/* REGISTER BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>

                        {/* LOGIN LINK */}
                        <p className="text-center text-sm text-gray-400">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-blue-400 hover:text-blue-300"
                            >
                                Login
                            </Link>
                        </p>

                        {/* HOME LINK */}
                        <p className="text-center text-sm">
                            <Link
                                to="/"
                                className="text-gray-400 transition hover:text-white"
                            >
                                Back to Home
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* TOAST NOTIFICATIONS */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="dark"
            />
        </div>
    );
}

export default Registeration;
