import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/Usercontext";
import { AuthDataContext } from "../context/Authcontext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function ProviderDashboard() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [requests, setRequests] = useState([]);

    const { userData } = useContext(userDataContext);
    const { serverUrl } = useContext(AuthDataContext);

    //  FETCH REQUESTS
    const fetchRequests = async () => {
        try {
            const res = await axios.get(
                `${serverUrl}/api/provider/provider`,
                { withCredentials: true }
            );
            setRequests(res.data.requests);
        } catch (error) {
            console.log("Error fetching requests");
        }
    };

    useEffect(() => {

        fetchRequests();
    }, [serverUrl]);

    // ProviderDashboard.jsx
    const handleStatus = async (requestId, status) => {
        try {
            await axios.post(
                `${serverUrl}/api/booking/update-status`,
                { requestId, status },
                { withCredentials: true }
            );

            toast.success(`Request ${status}`);
            setRequests((prev) => prev.filter((r) => r._id !== requestId));




        } catch (error) {
            console.log("Status update failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <nav className="flex items-center justify-between px-4 md:px-10 py-4 border-b border-slate-800 bg-slate-950">

                {/* LEFT: LOGO */}
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <img src={logo} className="h-9 md:h-10" />
                    <h1 className="text-sm md:text-xl font-bold text-blue-400">
                        ServiceHub
                    </h1>
                </div>

                {/* RIGHT: DASHBOARD + PROFILE */}
                <div className="flex items-center gap-3 md:gap-5 relative">

                    {/* DASHBOARD BUTTON */}
                    <button
                        onClick={() => navigate("/provider-dashboard")}
                        className="text-sm md:text-base hover:text-blue-400"
                    >
                        Dashboard
                    </button>
                    <button className="hidden md:block hover:text-blue-400"
                        onClick={() => {
                            document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        contact us
                    </button>

                    {/* PROFILE ICON */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center"
                    >
                        {userData?.avatar ? (
                            <img
                                src={`${serverUrl}/uploads/${userData.avatar}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="font-bold">
                                {userData?.name?.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </button>

                    {/* DROPDOWN */}
                    {open && (
                        <div className="absolute right-0 top-12 w-44 bg-slate-900 border border-slate-700 rounded-lg shadow-lg z-50">

                            <button
                                onClick={() => navigate("/userview")}
                                className="block w-full text-left px-4 py-2 hover:bg-slate-800"
                            >
                                View Profile
                            </button>

                            <button
                                onClick={() => navigate("/provideredit")}
                                className="block w-full text-left px-4 py-2 hover:bg-slate-800"
                            >
                                Edit Profile
                            </button>

                            <button
                                onClick={() => navigate("/jobs")}
                                className="block w-full text-left px-4 py-2 hover:bg-slate-800"
                            >
                                My Jobs
                            </button>
                            <button
                                onClick={() => {
                                    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-slate-800"
                            >
                                contact us
                            </button>

                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    navigate("/login");
                                }}
                                className="block w-full text-left px-4 py-2 text-red-400 hover:bg-slate-800"
                            >
                                Logout
                            </button>

                        </div>
                    )}

                </div>

            </nav>



            {/* DASHBOARD */}
            <section className="px-4 md:px-10 py-10">

                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-blue-400">
                    Service Requests
                </h2>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {requests.length === 0 ? (
                        <div className="text-center text-gray-400 col-span-full">
                            No requests available
                        </div>
                    ) : (
                        requests.map((req) => (
                            <div
                                key={req._id}
                                className="bg-slate-900 p-5 md:p-6 rounded-xl border border-slate-800 hover:border-blue-500 transition"
                            >

                                <h3 className="text-lg md:text-xl font-semibold mb-2 text-blue-300">
                                    {req.service}
                                </h3>

                                <p className="text-gray-400 text-sm md:text-base">
                                    Customer: {req.userId?.name || "N/A"}
                                </p>

                                <p className="text-gray-400 text-sm md:text-base">
                                    Location: {req.userId.address?.city || "N/A"} , {req.userId.address?.state || ""}
                                </p>
                                <p className="text-gray-400 text-sm md:text-base">
                                    Address: {req.userId.address?.full || "N/A"}
                                </p>

                                <p className="text-gray-400 mb-4 text-sm md:text-base">
                                    Date: {new Date(req.createdAt).toLocaleString("en-US", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3">

                                    <button
                                        onClick={() => handleStatus(req._id, "accepted")}
                                        className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 w-full"
                                    >
                                        Accept
                                    </button>

                                    <button
                                        onClick={() => handleStatus(req._id, "rejected")}
                                        className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 w-full"
                                    >
                                        Reject
                                    </button>

                                </div>


                            </div>
                        ))
                    )}

                </div>

            </section>
            <section id="contact" className="bg-slate-900 text-white py-12 px-4 md:px-10">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-400">
                    Contact Us
                </h2>

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

                    {/* Left */}
                    <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-4">Get in Touch</h3>
                        <p className="text-gray-400 mb-4">
                            Have questions or need help? Reach out to us directly.
                        </p>

                        <p className="text-gray-300">📧 Email: supportservicehub@gmail.com</p>
                        <p className="text-gray-300">📞 Phone: +91 93556 79054</p>
                        <p className="text-gray-300">📍 Location: India</p>
                    </div>

                    {/* Right (Buttons only) */}
                    <div className="flex flex-col gap-4 justify-center">

                        {/* WhatsApp */}
                        <button
                            className="w-full bg-green-500 hover:bg-green-600 p-3 rounded font-semibold"
                            onClick={() => {
                                const msg = "Hello, I want to contact ServiceHub.";
                                window.open(`https://wa.me/919355679054?text=${encodeURIComponent(msg)}`, "_blank");
                            }}
                        >
                            Chat on WhatsApp
                        </button>

                        {/* Email */}
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded font-semibold"
                            onClick={() => {
                                const subject = "Contact from ServiceHub";
                                const body = "Hello, I want to know more about your services.";
                                window.location.href = `mailto:supportservicehub@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                            }}
                        >
                            Send Email
                        </button>

                    </div>
                </div>
            </section>
            <ToastContainer />

        </div>
    );
}

export default ProviderDashboard;