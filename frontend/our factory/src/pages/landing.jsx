
import React from "react";
import {
    FaBolt,
    FaWrench,
    FaBroom,
    FaSnowflake,
    FaTools,
} from "react-icons/fa";
import { LuPaintbrushVertical } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/login");
    };

    const goToSignup = () => {
        navigate("/signup");
    };

    const scrollToContact = () => {
        document.getElementById("contact")?.scrollIntoView({
            behavior: "smooth",
        });
    };

    const services = [
        { name: "Electrician", icon: <FaBolt /> },
        { name: "Plumber", icon: <FaWrench /> },
        { name: "Cleaning", icon: <FaBroom /> },
        { name: "AC Repair", icon: <FaSnowflake /> },
        { name: "Carpenter", icon: <FaTools /> },
        { name: "Painter", icon: <LuPaintbrushVertical /> },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-gray-200">
            {/* Navbar */}
            <nav className="flex flex-col items-center justify-between gap-4 bg-slate-900 px-4 py-4 md:flex-row md:px-10">
                <h1 className="text-2xl font-bold text-blue-400">
                    ServiceHub
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                    <button
                        type="button"
                        className="hover:text-blue-400"
                        onClick={() => navigate("/")}
                    >
                        Home
                    </button>

                    <button
                        type="button"
                        className="hover:text-blue-400"
                        onClick={() =>
                            document.getElementById("services")?.scrollIntoView({
                                behavior: "smooth",
                            })
                        }
                    >
                        Services
                    </button>

                    <button
                        type="button"
                        className="hover:text-blue-400"
                        onClick={scrollToContact}
                    >
                        Contact Us
                    </button>

                    <button
                        type="button"
                        className="cursor-pointer hover:text-blue-400"
                        onClick={goToLogin}
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
                        onClick={goToSignup}
                    >
                        Sign Up
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <section className="flex h-auto flex-col items-center justify-center bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 px-4 py-20 text-center md:h-[70vh]">
                <h1 className="mb-4 text-3xl font-bold md:text-5xl">
                    Find Trusted Services Near You
                </h1>

                <p className="mb-6 text-sm text-gray-400 md:text-base">
                    Book electricians, plumbers, cleaners and more instantly.
                </p>

                <div className="flex w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search services..."
                        className="w-full rounded-l-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none"
                    />

                    <button
                        type="button"
                        className="rounded-r-lg bg-blue-600 px-6 hover:bg-blue-700"
                        onClick={() =>
                            document.getElementById("services")?.scrollIntoView({
                                behavior: "smooth",
                            })
                        }
                    >
                        Search
                    </button>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="px-4 py-16 md:px-10">
                <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">
                    Popular Services
                </h2>

                <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-3 md:grid-cols-5 md:gap-6">
                    {services.map((service) => (
                        <div
                            key={service.name}
                            className="rounded-xl border border-transparent bg-slate-900 p-6 transition hover:border-blue-500"
                        >
                            <div className="mb-3 flex justify-center text-3xl text-blue-400">
                                {service.icon}
                            </div>
                            {service.name}
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats */}
            <section className="bg-slate-900 py-16">
                <div className="flex flex-col justify-center gap-8 text-center md:flex-row md:gap-20">
                    <div>
                        <h2 className="text-4xl font-bold text-blue-400">500+</h2>
                        <p className="text-gray-400">Service Providers</p>
                    </div>

                    <div>
                        <h2 className="text-4xl font-bold text-blue-400">10K+</h2>
                        <p className="text-gray-400">Happy Customers</p>
                    </div>

                    <div>
                        <h2 className="text-4xl font-bold text-blue-400">20+</h2>
                        <p className="text-gray-400">Services Available</p>
                    </div>
                </div>
            </section>

            {/* Provider Section */}
            <section className="px-4 py-16 text-center">
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                    Become a Service Provider
                </h2>

                <p className="mb-6 text-sm text-gray-400 md:text-base">
                    Join our platform and start earning from your skills.
                </p>

                <button
                    type="button"
                    className="rounded-lg bg-blue-600 px-6 py-3 hover:bg-blue-700"
                    onClick={goToSignup}
                >
                    Join Now
                </button>
            </section>

            {/* Testimonials */}
            <section className="bg-slate-900 px-4 py-16">
                <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">
                    What Customers Say
                </h2>

                <div className="flex flex-col justify-center gap-6 md:flex-row">
                    <div className="w-full rounded-xl bg-slate-800 p-6 md:w-[300px]">
                        <div>⭐⭐⭐⭐⭐</div>
                        <p className="mt-3 text-sm text-gray-400 md:text-base">
                            Electrician arrived quickly and fixed the issue perfectly.
                        </p>
                        <p className="mt-3 font-semibold">Rahul</p>
                    </div>

                    <div className="w-full rounded-xl bg-slate-800 p-6 md:w-[300px]">
                        <div>⭐⭐⭐⭐⭐</div>
                        <p className="mt-3 text-sm text-gray-400 md:text-base">
                            Very easy booking process and professional service.
                        </p>
                        <p className="mt-3 font-semibold">Anita</p>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section
                id="contact"
                className="scroll-mt-6 bg-gray-900 px-6 py-12 text-white"
            >
                <h2 className="mb-8 text-center text-3xl font-bold text-blue-400">
                    Contact Us
                </h2>

                <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
                    <div>
                        <h3 className="mb-4 text-xl font-semibold">Get in Touch</h3>

                        <p className="mb-4 text-gray-400">
                            Have questions or need help? Contact us using the details below.
                        </p>

                        <p className="mb-3 text-gray-300">
                            📧 Email:{" "}
                            <a
                                href="mailto:sundarampal30@gmail.com"
                                className="break-all hover:text-blue-400"
                            >
                                sundarampal30@gmail.com
                            </a>
                        </p>

                        <p className="mb-3 text-gray-300">
                            📞 Phone:{" "}
                            <a
                                href="tel:+919125637430"
                                className="hover:text-blue-400"
                            >
                                +91 9125637430
                            </a>
                        </p>

                        <p className="text-gray-300">📍 Location: India</p>
                    </div>

                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full rounded bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full rounded bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <textarea
                            rows="4"
                            placeholder="Your Message"
                            className="w-full rounded bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="button"
                            className="w-full rounded bg-blue-500 p-3 font-semibold hover:bg-blue-600"
                            onClick={goToSignup}
                        >
                            Sign Up to Continue
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black py-6 text-center text-sm text-gray-400">
                © 2026 ServiceHub. All rights reserved.
            </footer>
        </div>
    );
}

export default Landing;
