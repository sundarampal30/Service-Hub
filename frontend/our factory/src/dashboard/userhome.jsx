
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/Usercontext";
import { AuthDataContext } from "../context/Authcontext";

function UserHome() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const userContext = useContext(userDataContext);
  const authContext = useContext(AuthDataContext);

  const userData = userContext?.userData;
  const serverUrl = authContext?.serverUrl;

  // Available services and their correct routes
  const services = [
    { name: "Electrician", icon: "⚡", path: "/electrician" },
    { name: "Plumber", icon: "🔧", path: "/plumber" },
    { name: "Cleaning", icon: "🧹", path: "/cleaning" },
    { name: "AC Repair", icon: "❄️", path: "/ac-repair" },
    { name: "Painter", icon: "🎨", path: "/painter" },
    { name: "Carpenter", icon: "🪚", path: "/carpenter" },
  ];

  // Search services
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  // Scroll to contact section
  const scrollToContact = () => {
    setOpen(false);

    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Return to top
  const goHome = () => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(false);
    navigate("/login");
  };

  // WhatsApp contact
  const handleWhatsApp = () => {
    const phoneNumber = "919355679054";
    const message = "Hello, I want to contact ServiceHub.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

window.open(url, "_blank", "noopener,noreferrer");
  };

// Email contact
const handleEmail = () => {
    const email = "sundarampal30@gmail.com";
    const subject = "Contact from ServiceHub";
    const body = "Hello, I want to know more about your services.";

    window.location.href =
        `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

// Profile picture
const avatarUrl =
    userData?.avatar && serverUrl
        ? `${serverUrl}/uploads/${userData.avatar}`
        : null;

return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white">

        {/* NAVBAR */}
        <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-700 bg-slate-950/95 px-4 py-4 backdrop-blur md:px-10">

            {/* LOGO */}
            <button
                type="button"
                className="flex items-center gap-2"
                onClick={() => navigate("/")}
                aria-label="Go to ServiceHub home"
            >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-xl font-bold shadow-lg">
                    S
                </span>

                <span className="text-lg font-bold text-blue-400 md:text-xl">
                    ServiceHub
                </span>
            </button>

            {/* NAVIGATION */}
            <div className="flex items-center gap-3 md:gap-6">

                <button
                    type="button"
                    onClick={goHome}
                    className="hidden transition hover:text-blue-400 md:block"
                >
                    Home
                </button>

                <button
                    type="button"
                    onClick={scrollToContact}
                    className="hidden transition hover:text-blue-400 md:block"
                >
                    Contact Us
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/mybookings")}
                    className="hidden transition hover:text-blue-400 md:block"
                >
                    My Bookings
                </button>

                {/* PROFILE MENU */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setOpen((previous) => !previous)}
                        aria-label="Toggle profile menu"
                        aria-expanded={open}
                        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-blue-400 bg-blue-600"
                    >
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt="User profile"
                                className="h-full w-full object-cover"
                                onError={(event) => {
                                    event.currentTarget.style.display = "none";
                                }}
                            />
                        ) : (
                            <span className="font-bold">
                                {userData?.name?.charAt(0)?.toUpperCase() || "U"}
                            </span>
                        )}
                    </button>

                    {open && (
                        <div className="absolute right-0 top-full z-50 mt-3 w-48 overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-xl">

                            <button
                                type="button"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/userview");
                                }}
                                className="block w-full px-4 py-3 text-left hover:bg-slate-800"
                            >
                                View Profile
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/useredit");
                                }}
                                className="block w-full px-4 py-3 text-left hover:bg-slate-800"
                            >
                                Edit Profile
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/mybookings");
                                }}
                                className="block w-full px-4 py-3 text-left hover:bg-slate-800"
                            >
                                My Bookings
                            </button>

                            <button
                                type="button"
                                onClick={scrollToContact}
                                className="block w-full px-4 py-3 text-left hover:bg-slate-800"
                            >
                                Contact Us
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="block w-full px-4 py-3 text-left text-red-400 hover:bg-slate-800"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>

        {/* HERO SECTION */}
        <section className="px-4 py-14 text-center md:py-20">

            <p className="mb-3 font-semibold tracking-widest text-blue-400">
                YOUR HOME, OUR RESPONSIBILITY
            </p>

            <h1 className="mb-5 text-3xl font-extrabold md:text-5xl">
                Find Trusted Home Services
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
                Book electricians, plumbers, cleaners and more in minutes.
                Find reliable professionals for all your home service needs.
            </p>

            <div className="mx-auto max-w-lg">
                <input
                    type="search"
                    placeholder="Search services..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    aria-label="Search available services"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 text-white outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                />
            </div>

            <button
                type="button"
                onClick={() => {
                    document.getElementById("services")?.scrollIntoView({
                        behavior: "smooth",
                    });
                }}
                className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
                Explore Services
            </button>
        </section>

        {/* SERVICES SECTION */}
        <section
            id="services"
            className="scroll-mt-24 px-4 pb-16 md:px-10 md:pb-20"
        >
            <h2 className="mb-3 text-center text-2xl font-bold text-blue-400 md:text-3xl">
                Popular Services
            </h2>

            <p className="mb-10 text-center text-gray-400">
                Choose a service for your home.
            </p>

            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6">

                {filteredServices.map((service) => (
                    <button
                        key={service.name}
                        type="button"
                        onClick={() => navigate(service.path)}
                        className="rounded-xl border border-slate-700 bg-slate-900 p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-slate-800 md:p-6"
                    >
                        <div className="mb-4 text-4xl" aria-hidden="true">
                            {service.icon}
                        </div>

                        <h3 className="font-semibold">
                            {service.name}
                        </h3>

                        <span className="mt-3 inline-block text-sm text-blue-400">
                            View Service →
                        </span>
                    </button>
                ))}
            </div>

            {filteredServices.length === 0 && (
                <p className="mt-8 text-center text-gray-400">
                    No services found. Try another search.
                </p>
            )}
        </section>

        {/* CONTACT SECTION */}
        <section
            id="contact"
            className="scroll-mt-20 border-t border-slate-700 bg-slate-950 px-4 py-14 md:px-10 md:py-16"
        >
            <h2 className="mb-4 text-center text-3xl font-bold text-blue-400">
                Contact Us
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-center leading-7 text-gray-300">
                Have questions or need help? Contact us directly.
                Our team will help you with your service-related queries.
            </p>

            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">

                {/* CONTACT INFORMATION */}
                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl md:p-8">

                    <h3 className="mb-6 text-xl font-bold text-white">
                        Get in Touch
                    </h3>

                    <div className="space-y-6">

                        {/* EMAIL */}
                        <div className="flex items-start gap-4">
                            <span className="text-2xl" aria-hidden="true">
                                📧
                            </span>

                            <div className="min-w-0">
                                <p className="mb-2 font-semibold text-gray-200">
                                    Email Address
                                </p>

                                <a
                                    href="mailto:sundarampal30@gmail.com"
                                    className="break-all text-blue-400 underline underline-offset-4 hover:text-blue-300"
                                >
                                    sundarampal30@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* PHONE */}
                        <div className="flex items-start gap-4">
                            <span className="text-2xl" aria-hidden="true">
                                📞
                            </span>

                            <div>
                                <p className="mb-2 font-semibold text-gray-200">
                                    Phone Number
                                </p>

                                <a
                                    href="tel:+919125637430"
                                    className="text-blue-400 underline underline-offset-4 hover:text-blue-300"
                                >
                                    +91 9125637430
                                </a>
                            </div>
                        </div>

                        {/* LOCATION */}
                        <div className="flex items-start gap-4">
                            <span className="text-2xl" aria-hidden="true">
                                📍
                            </span>

                            <div>
                                <p className="mb-2 font-semibold text-gray-200">
                                    Location
                                </p>

                                <p className="text-gray-300">
                                    India
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTACT ACTIONS */}
                <div className="flex flex-col justify-center rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl md:p-8">

                    <h3 className="mb-3 text-xl font-bold">
                        How Can We Help?
                    </h3>

                    <p className="mb-6 leading-7 text-gray-300">
                        Select one of the options below to get in touch with us.
                    </p>

                    <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="mb-4 w-full rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                        Chat on WhatsApp
                    </button>

                    <button
                        type="button"
                        onClick={handleEmail}
                        className="mb-4 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Send Email
                    </button>

                    <a
                        href="tel:+919125637430"
                        className="w-full rounded-lg bg-slate-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-slate-600"
                    >
                        Call Us
                    </a>
                </div>
            </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-800 bg-slate-950 px-4 py-6 text-center text-sm text-gray-400">
            <p>
                © 2026 ServiceHub. All rights reserved.
            </p>

            <button
                type="button"
                onClick={scrollToContact}
                className="mt-3 text-blue-400 hover:text-blue-300"
            >
                Contact Us
            </button>
        </footer>
    </div>
);
}

export default UserHome;
