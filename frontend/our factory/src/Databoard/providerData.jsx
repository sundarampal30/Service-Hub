import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/Authcontext";
import { userDataContext } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";

function ProviderData() {
    const { serverUrl } = useContext(AuthDataContext);
    const { userData } = useContext(userDataContext);
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    // 🔒 role protection
    useEffect(() => {
        if (userData && userData.role !== "provider") {
            navigate("/user");
        }
    }, [userData]);

    // 📦 fetch requests
    const fetchRequests = async () => {
        try {
            const res = await axios.get(
                `${serverUrl}/api/booking/history`,

                { withCredentials: true }
            );
            console.log("All requests from backend:", res.data.requests); // ✅ pura object
            console.log("Request statuses:", res.data.requests.map(r => r.status)); // ✅ sirf status values

            setRequests(res.data.requests);
        } catch (error) {
            console.log("Error fetching requests");
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    //  filter logic
    const filteredRequests =
        filter === "all"
            ? requests
            : requests.filter((r) => r.status.toLowerCase() === filter);
    //  earnings
    const totalEarnings = requests
        .filter((r) => r.status === "accepted")
        .reduce((sum, r) => sum + (r.providerId?.fee || 0), 0);

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6">

            <h1 className="text-3xl font-bold text-blue-400 mb-6">
                Provider Requests (Read Only)
            </h1>

            {/* Earnings */}
            <div className="bg-slate-800 p-4 rounded mb-6">
                <h2>Total Earnings</h2>
                <p className="text-green-400 text-2xl font-bold">
                    ₹ {totalEarnings}
                </p>
            </div>

            {/*  FILTER BUTTONS */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-600" : "bg-slate-700"
                        }`}
                >
                    All
                </button>

                <button
                    onClick={() => setFilter("accepted")}
                    className={`px-4 py-2 rounded ${filter === "accepted" ? "bg-green-600" : "bg-slate-700"
                        }`}
                >
                    Accepted
                </button>

                <button
                    onClick={() => setFilter("rejected")}
                    className={`px-4 py-2 rounded ${filter === "rejected" ? "bg-red-600" : "bg-slate-700"
                        }`}
                >
                    Rejected
                </button>
            </div>

            {/* 📦 REQUEST LIST */}
            <div className="grid md:grid-cols-2 gap-4">
                {filteredRequests.length === 0 ? (
                    <p className="text-gray-400">No requests found</p>
                ) : (
                    filteredRequests.map((req) => (
                        <div
                            key={req._id}
                            className="bg-slate-800 p-4 rounded"
                        >
                            <h3 className="text-lg font-semibold">
                                {req.service}
                            </h3>

                            <p>Customer: {req.userId?.name}</p>
                            <p>Location: {req.userId.address?.city || "N/A"} , {req.userId.address?.state || ""}</p>
                            <p>Address: {req.userId.address?.full || "N/A"}</p>
                            <p>fee: ₹ {req.providerId?.fee}</p>
                            <p>
                                Date:{" "}
                                {new Date(req.createdAt).toLocaleString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                })}
                            </p>

                            <p className="mt-2">
                                Status:{" "}
                                <span
                                    className={
                                        req.status === "accept"
                                            ? "text-green-400"
                                            : req.status === "reject"
                                                ? "text-red-400"
                                                : "text-yellow-400"
                                    }
                                >
                                    {req.status}
                                </span>
                            </p>

                            {/* ❌ NO ACCEPT/REJECT BUTTONS HERE */}
                            <p className="text-gray-500 mt-3 text-sm">
                                Action only available in Provider Dashboard
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ProviderData;