import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/Authcontext";
import { userDataContext } from "../context/Usercontext";

function MyBookings() {
    const { serverUrl } = useContext(AuthDataContext);
    const { userData } = useContext(userDataContext);
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(
                    `${serverUrl}/api/booking/my-bookings`,
                    { withCredentials: true }
                );

                console.log("Bookings fetched:", res.data);
                console.log(res.data.bookings);
                // 🔥 SAFE DATA HANDLE
                const data = res.data.bookings || res.data;

                if (Array.isArray(data)) {
                    setBookings(data);
                } else {
                    console.log("Data is not array:", data);
                    setBookings([]);
                }

            } catch (error) {
                console.log("Error fetching bookings:", error);
            }
        };

        if (userData) fetchBookings();
    }, [serverUrl, userData]);

    // 🔥 SAFE FILTER
    const filteredBookings = Array.isArray(bookings)
        ? filter === "all"
            ? bookings
            : bookings.filter((b) => b.status === filter)
        : [];

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 overflow-x-hidden">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">My Bookings</h1>

            {/* FILTER BUTTONS */}
            <div className="flex gap-3 mb-6 overflow-x-auto">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-3 py-2 rounded flex-shrink-0 whitespace-nowrap ${filter === "all" ? "bg-blue-600" : "bg-slate-700"
                        }`}
                >
                    All
                </button>

                <button
                    onClick={() => setFilter("pending")}
                    className={`px-3 py-2 rounded  flex-shrink-0 whitespace-nowrap ${filter === "pending" ? "bg-yellow-500" : "bg-slate-700"
                        }`}
                >
                    Pending
                </button>

                <button
                    onClick={() => setFilter("accepted")}
                    className={`px-3 py-2 rounded flex-shrink-0 whitespace-nowrap ${filter === "accepted" ? "bg-green-600" : "bg-slate-700"
                        }`}
                >
                    Accepted
                </button>

                <button
                    onClick={() => setFilter("rejected")}
                    className={`px-3 py-2 rounded flex-shrink-0 whitespace-nowrap ${filter === "rejected" ? "bg-red-600" : "bg-slate-700"
                        }`}
                >
                    Rejected
                </button>
            </div>

            {/* BOOKINGS LIST */}
            <div className="grid md:grid-cols-2 gap-4">
                {!Array.isArray(filteredBookings) || filteredBookings.length === 0 ? (
                    <p className="text-gray-400">No bookings found.</p>
                ) : (
                    filteredBookings.map((booking) => (
                        <div key={booking._id} className="bg-slate-800 p-4 rounded">
                            <h2 className="text-lg font-semibold">{booking.service}</h2>
                            <p>Provider: {booking.providerId?.name || "N/A"}</p>
                            <p>Address: {booking.userId?.address?.full || "N/A"}</p>
                            <p>Fee: ₹{booking.providerId?.fee}</p>
                            <p>Date: {new Date(booking.date).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}</p>
                            <p>Time: {new Date(booking.date).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}</p>

                            <p className="mt-2">
                                <span
                                    className={
                                        booking.status === "accepted"
                                            ? "text-green-400"
                                            : booking.status === "rejected"
                                                ? "text-red-400"
                                                : "text-yellow-400"
                                    }
                                >
                                    {booking.status === "pending" && "⏳ Waiting for provider"}
                                    {booking.status === "accepted" && "✅ Booking Confirmed"}
                                    {booking.status === "rejected" && "❌ Rejected"}
                                </span>
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MyBookings;