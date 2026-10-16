import React, { useContext } from "react";
import { userDataContext } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/Authcontext";

function ViewProfile() {
    const { userData } = useContext(userDataContext);
    const navigate = useNavigate();
    const { serverUrl } = useContext(AuthDataContext);

    if (!userData) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    const isProvider = userData.role === "provider";

    return (
        <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center px-4">

            <div className="bg-slate-800 p-6 md:p-8 rounded-xl w-full max-w-md shadow-lg">

                <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">
                    {isProvider ? "Provider Profile" : "User Profile"}
                </h2>

                {/* Avatar */}
                <div className="flex justify-center mb-4">
                    {userData.avatar ? (
                        <img
                            src={`${serverUrl}/uploads/${userData.avatar}`}
                            className="w-20 h-20 rounded-full object-cover"
                            alt="profile"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                            {userData.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label className="text-gray-400 text-sm">Name</label>
                    <input
                        type="text"
                        value={userData.name || ""}
                        readOnly
                        className="w-full p-3 mt-1 rounded bg-slate-700 text-white outline-none"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="text-gray-400 text-sm">Email</label>
                    <input
                        type="email"
                        value={userData.email || ""}
                        readOnly
                        className="w-full p-3 mt-1 rounded bg-slate-700 text-white outline-none"
                    />
                </div>

                {/* Phone */}
                <div className="mb-4">
                    <label className="text-gray-400 text-sm">Phone</label>
                    <input
                        type="text"
                        value={userData.phone || userData.Phone || ""}
                        readOnly
                        className="w-full p-3 mt-1 rounded bg-slate-700 text-white outline-none"
                    />
                </div>
                {/* Address */}
                <div className="mb-4">
                    <label className="text-gray-400 text-sm">Address</label>
                    <input
                        type="text"
                        value={userData.address?.full || ""}
                        readOnly
                        className="w-full p-3 mt-1 rounded bg-slate-700 text-white outline-none"
                    />
                </div>

                {/* City */}
                <div className="mb-4">
                    <label className="text-gray-400 text-sm">City</label>
                    <input
                        type="text"
                        value={userData.address?.city || ""}
                        readOnly
                        className="w-full p-3 mt-1 rounded bg-slate-700 text-white outline-none"
                    />
                </div>

                {/* State */}
                <div className="mb-4">
                    <label className="text-gray-400 text-sm">State</label>
                    <input
                        type="text"
                        value={userData.address?.state || ""}
                        readOnly
                        className="w-full p-3 mt-1 rounded bg-slate-700 text-white outline-none"
                    />
                </div>

                {/* Country */}
                <div className="mb-4">
                    <label className="text-gray-400 text-sm">Country</label>
                    <input
                        type="text"
                        value={userData.address?.country || ""}
                        readOnly
                        className="w-full p-3 mt-1 rounded bg-slate-700 text-white outline-none"
                    />
                </div>

                {/* Pincode */}
                <div className="mb-4">
                    <label className="text-gray-400 text-sm">Pincode</label>
                    <input
                        type="text"
                        value={userData.address?.pincode || ""}
                        readOnly
                        className="w-full p-3 mt-1 rounded bg-slate-700 text-white outline-none"
                    />
                </div>

                {/* Provider-specific fields */}
                {isProvider && (
                    <>
                        <div className="mb-4">
                            <label className="text-gray-400 text-sm">Service</label>
                            <input
                                type="text"
                                value={userData.service || ""}
                                readOnly
                                className="w-full p-3 mt-1 rounded bg-slate-700 text-white outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-400 text-sm">Fee</label>
                            <input
                                type="text"
                                value={userData.fee || ""}
                                readOnly
                                className="w-full p-3 mt-1 rounded bg-slate-700 text-white outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-400 text-sm">Experience</label>
                            <input
                                type="text"
                                value={userData.experience || ""}
                                readOnly
                                className="w-full p-3 mt-1 rounded bg-slate-700 text-white outline-none"
                            />
                        </div>
                    </>
                )}

                {/* Buttons */}
                <div className="flex gap-3 mt-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-1/2 bg-gray-600 hover:bg-gray-700 p-3 rounded font-semibold"
                    >
                        Back
                    </button>

                    <button
                        onClick={() => navigate(isProvider ? "/provideredit" : "/useredit")}
                        className="w-1/2 bg-blue-500 hover:bg-blue-600 p-3 rounded font-semibold"
                    >
                        Edit
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ViewProfile;