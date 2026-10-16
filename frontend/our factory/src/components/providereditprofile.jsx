import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { userDataContext } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthDataContext } from "../context/Authcontext";
import "react-toastify/dist/ReactToastify.css";

function ProviderEditProfile() {
    const { userData, setUserData } = useContext(userDataContext);
    const { serverUrl } = useContext(AuthDataContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        Phone: "",
        address: "",
        theme: "dark",
        service: "",
        fee: "",
        experience: ""
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (userData) {
            setForm({
                name: userData.name || "",
                Phone: userData.Phone || "",
                address: userData.address || "",
                theme: userData.theme || "dark",
                service: userData.service || "",
                fee: userData.fee || "",
                experience: userData.experience || ""
            });

            if (userData.avatar) {
                setPreview(`${serverUrl}/uploads/${userData.avatar}`);
            }
        }
    }, [userData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            Object.entries(form).forEach(([key, value]) => {
                formData.append(key, value);
            });

            if (file) {
                formData.append("avatar", file);
            }

            const res = await axios.post(
                `${serverUrl}/api/provider/provider/edit-profile`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setUserData(res.data.user);
            toast.success("Profile updated successfully");

            setTimeout(() => navigate("/provider"), 1200);

        } catch (error) {
            console.log(error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Update failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-4">

            <div className="bg-slate-800 p-6 md:p-8 rounded-xl w-full max-w-md text-center">

                {/* AVATAR */}
                <div className="mb-4">
                    <img
                        src={preview || "https://via.placeholder.com/100"}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-blue-400"
                    />
                </div>

                <label className="bg-blue-600 px-4 py-2 rounded cursor-pointer inline-block">
                    Choose Image
                    <input type="file" onChange={handleFileChange} className="hidden" />
                </label>

                <p className="mt-2 text-sm text-gray-400">
                    {file ? file.name : "No file selected"}
                </p>

                {/* INPUTS */}
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full mt-4 p-2 rounded bg-slate-700"
                />

                <input
                    name="Phone"
                    value={form.Phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full mt-4 p-2 rounded bg-slate-700"
                />

                <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="w-full mt-4 p-2 rounded bg-slate-700"
                />

                <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full mt-4 p-2 rounded bg-slate-700"
                >
                    <option value="">Select service</option>
                    <option value="electrician">Electrician</option>
                    <option value="plumber">Plumber</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="ac-repair">AC Repair</option>
                    <option value="painter">Painter</option>
                    <option value="carpenter">Carpenter</option>
                </select>

                <input
                    name="fee"
                    value={form.fee}
                    onChange={handleChange}
                    placeholder="Fee"
                    type="number"
                    className="w-full mt-4 p-2 rounded bg-slate-700"
                />

                <input
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="Experience"
                    className="w-full mt-4 p-2 rounded bg-slate-700"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full mt-5 bg-blue-600 py-2 rounded hover:bg-blue-700"
                >
                    Update Profile
                </button>

            </div>

            <ToastContainer />
        </div>
    );
}

export default ProviderEditProfile;