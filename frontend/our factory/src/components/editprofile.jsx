import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { userDataContext } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthDataContext } from "../context/Authcontext";
import "react-toastify/dist/ReactToastify.css";

function EditProfile() {
    const { userData, setUserData } = useContext(userDataContext);
    const { serverUrl } = useContext(AuthDataContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        Phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "",

        theme: "dark",
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (userData) {
            setForm({
                name: userData.name || "",
                Phone: userData.Phone || "",
                address: userData.address?.full || "",
                city: userData.address?.city || "",
                state: userData.address?.state || "",
                country: userData.address?.country || "",
                pincode: userData.address?.pincode || "",
                theme: userData.theme || "dark",
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

            Object.keys(form).forEach((key) => {
                formData.append(key, form[key]);
            });

            if (file) {
                formData.append("avatar", file);
            }

            const res = await axios.post(
                `${serverUrl}/api/user/useredit-profile`,
                formData,
                {
                    withCredentials: true,

                }
            );

            setUserData(res.data.user);
            toast.success("Profile updated successfully");

            setTimeout(() => navigate("/user"), 1200);

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

                <label className="cursor-pointer bg-blue-600 px-4 py-2 rounded inline-block">
                    Choose Image
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                <p className="mt-2 text-sm text-gray-400">
                    {file ? file.name : "No file selected"}
                </p>

                {/* INPUTS */}
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full mt-4 p-2 rounded bg-slate-700"
                />

                <input
                    type="text"
                    name="Phone"
                    value={form.Phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full mt-4 p-2 rounded bg-slate-700"
                />

                <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder=" street/ FullAddress"
                    className="w-full mt-4 p-2 rounded bg-slate-700"
                />
                <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full mt-4 p-2 rounded bg-slate-700"
                />

                <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full mt-4 p-2 rounded bg-slate-700"
                />

                <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    className="w-full mt-4 p-2 rounded bg-slate-700"
                />

                <input
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="w-full mt-4 p-2 rounded bg-slate-700"
                />


                <select
                    name="theme"
                    value={form.theme}
                    onChange={handleChange}
                    className="w-full mt-4 p-2 rounded bg-slate-700"
                >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                </select>

                <button
                    onClick={handleSubmit}
                    className="w-full mt-5 bg-blue-600 py-2 rounded hover:bg-blue-700"
                >
                    Save Changes
                </button>

            </div>

            <ToastContainer />
        </div>
    );
}

export default EditProfile;