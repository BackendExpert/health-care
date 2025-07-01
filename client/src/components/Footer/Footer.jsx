import React from 'react'
import { FaFacebook, FaAngleRight, FaLinkedinIn, FaLocationDot, FaWhatsapp, FaX } from "react-icons/fa6";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 py-12 px-8 xl:px-32">

                {/* Contact Us */}
                <div>
                    <h1 className="text-2xl font-bold text-blue-900 mb-4">Contact Us</h1>
                    <p className="text-blue-700 mb-6">Keep up to date with our latest news & special offers.</p>

                    <div className="space-y-5 text-blue-700">
                        <div className="flex items-center">
                            <FaLocationDot className="h-6 w-6 text-blue-600" />
                            <p className="ml-4">88, Cross Street, ABC, 00000</p>
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="h-6 w-6 text-blue-600" />
                            <p className="ml-4">hello.healthcare@gmail.com</p>
                        </div>
                        <div className="flex items-center">
                            <FaPhoneAlt className="h-6 w-6 text-blue-600" />
                            <p className="ml-4">+94 0711758851</p>
                        </div>
                    </div>

                    <div className="flex space-x-4 mt-8">
                        {[FaFacebook, FaX, FaLinkedinIn, FaWhatsapp].map((Icon, index) => (
                            <div key={index} className="p-3 bg-blue-100 rounded-full hover:bg-blue-400 hover:scale-110 transition transform cursor-pointer shadow-sm">
                                <Icon className="text-blue-700" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h1 className="text-2xl font-bold text-blue-900 mb-4">Quick Links</h1>
                    <div className="space-y-4">
                        {["About Us", "Our Services", "Meet The Team", "FAQs", "Testimonials", "Contact"].map((item, index) => (
                            <div key={index} className="flex items-center hover:translate-x-2 transition">
                                <FaAngleRight className="h-4 w-4 text-blue-500" />
                                <p className="ml-3 text-blue-700 cursor-pointer hover:text-blue-900">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Services */}
                <div>
                    <h1 className="text-2xl font-bold text-blue-900 mb-4">Popular Services</h1>
                    <div className="space-y-4">
                        {["Cardiology Care", "Dental Surgery", "Pediatric Clinic", "Emergency Care", "Orthopedic Services", "Neurology"].map((item, index) => (
                            <div key={index} className="flex items-center hover:translate-x-2 transition">
                                <FaAngleRight className="h-4 w-4 text-blue-500" />
                                <p className="ml-3 text-blue-700 cursor-pointer hover:text-blue-900">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h1 className="text-2xl font-bold text-blue-900 mb-4">Let’s Stay In Touch</h1>
                    <p className="text-blue-700 mb-5">Subscribe for newsletter</p>
                    <form className="flex flex-col space-y-4">
                        <input
                            type="email"
                            placeholder="Enter Email Address"
                            className="p-4 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:shadow-xl transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="bg-blue-600 py-6 px-8 xl:px-32 text-white flex flex-col xl:flex-row items-center justify-between space-y-4 xl:space-y-0 text-center xl:text-left border-t border-blue-500">
                <div>
                    © {new Date().getFullYear()} <span className="font-bold">MyHealthCare</span>. All Rights Reserved.
                </div>
                <div>
                    Engineered By <a href="https://blackalphalabs.com/" target="_blank" className="underline hover:text-blue-200">BlackAlphaLabs</a>
                </div>
            </div>
        </div>
    )
}

export default Footer
