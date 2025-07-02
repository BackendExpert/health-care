import React from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <div className="bg-blue-50 text-gray-800 min-h-screen pt-16">
            {/* Header */}
            <div className="bg-blue-700 text-white py-20 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="max-w-2xl mx-auto text-lg">
                    We're here to assist you. Reach out to us for any inquiries or appointments.
                </p>
            </div>

            {/* Contact Info Cards */}
            <div className="py-16 px-4 xl:px-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
                    <FaPhoneAlt className="text-blue-600 text-4xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Phone</h3>
                    <p className="text-gray-600 mb-2">+94 71 123 4567</p>
                    <p className="text-gray-600">+94 77 987 6543</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
                    <FaEnvelope className="text-blue-600 text-4xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Email</h3>
                    <p className="text-gray-600 mb-2">info@healthcare.lk</p>
                    <p className="text-gray-600">support@healthcare.lk</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
                    <FaMapMarkerAlt className="text-blue-600 text-4xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Location</h3>
                    <p className="text-gray-600 mb-2">123 Hospital Road</p>
                    <p className="text-gray-600">Kandy, Sri Lanka</p>
                </div>
            </div>

            {/* Contact Form */}
            <div className="py-16 px-4 xl:px-32 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Send Us a Message</h2>
                <form className="bg-white p-8 rounded-2xl shadow-md space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Subject"
                        className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        rows="5"
                        placeholder="Your Message"
                        className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-white py-4 rounded-full font-semibold hover:bg-blue-800 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ContactUs
