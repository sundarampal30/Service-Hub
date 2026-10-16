import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/Authcontext";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function PainterPage() {
    const { serverUrl } = useContext(AuthDataContext);
    const [painters, setPainters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPainters = async () => {
            try {
                const res = await axios.get(
                    `${serverUrl}/api/provider/service/painter`
                );

                console.log("API DATA:", res.data); // 

                setPainters(res.data.providers || []); // 

            } catch (error) {
                console.log("Error fetching painters", error);
                setPainters([]); //
            }
        };

        fetchPainters();
    }, [serverUrl]);

    const [loading, setLoading] = useState(false);

    const handleBooking = async (providerId, service) => {
        if (loading) return;

        setLoading(true);
        try {
            await axios.post(
                `${serverUrl}/api/booking/create`,
                {
                    providerId,
                    service,
                    date: new Date().toISOString(),
                    address: "User Address",
                    phone: "User Phone"

                },
                { withCredentials: true }
            );

            toast.success("Booking successful");
            setTimeout(() => {
                navigate('/user');
            }, 1000);
        } catch (error) {
            console.log("Booking failed", error);
            toast.error("Booking failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-10">

            <h1 className="text-3xl font-bold mb-8 text-blue-400">
                Painters
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                {painters.length === 0 ? (
                    <p>No painters available</p>
                ) : (
                    painters.map((item) => (
                        <div
                            key={item._id}
                            className="bg-slate-800 p-5 rounded-xl flex justify-between items-center"
                        >

                            {/* LEFT SIDE DATA */}
                            <div>
                                <h2 className="text-xl font-semibold">{item.name}</h2>

                                <p className="text-gray-400">
                                    Phone: {item.Phone}
                                </p>

                                <p className="text-gray-400">
                                    Service: {item.service}
                                </p>

                                <p className="text-gray-400">
                                    Address: {item.address}
                                </p>

                                {/* 👇 Extra fields */}
                                <p className="text-gray-400">
                                    Experience: {item.experience || ""}
                                </p>

                                <p className="text-gray-400">
                                    Fee: ₹{item.fee || ""}
                                </p>

                                {/* 👇 Book Button */}
                                <button className="mt-3 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"

                                    onClick={() => handleBooking(item._id, item.service)}>
                                    Book Now
                                </button>
                            </div>

                            {/* RIGHT SIDE AVATAR */}
                            <div className="order-1 md:order-2 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-slate-700 flex items-center justify-center">
                                {item.avatar ? (
                                    <img
                                        src={`${serverUrl}/uploads/${item.avatar}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <CgProfile size={40} className="text-white" />
                                )}
                            </div>

                        </div>
                    ))
                )}

            </div>
            <ToastContainer />
        </div>
    );
}

export default PainterPage;