import React from "react";
import { FaStethoscope, FaTooth, FaBaby, FaBone, FaBrain } from "react-icons/fa6";
import { FaAmbulance } from "react-icons/fa";  // classic FA

const services = [
    { name: "Cardiology Care", icon: FaStethoscope, bg: "bg-red-100", iconColor: "text-red-600" },
    { name: "Dental Surgery", icon: FaTooth, bg: "bg-yellow-100", iconColor: "text-yellow-600" },
    { name: "Pediatric Clinic", icon: FaBaby, bg: "bg-green-100", iconColor: "text-green-600" },
    { name: "Emergency Care", icon: FaAmbulance, bg: "bg-blue-100", iconColor: "text-blue-600" },
    { name: "Orthopedic Services", icon: FaBone, bg: "bg-purple-100", iconColor: "text-purple-600" },
    { name: "Neurology", icon: FaBrain, bg: "bg-pink-100", iconColor: "text-pink-600" },
];

const OurServices = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-extrabold text-blue-900 mb-10 text-center">Our Services</h2>
            <p className="text-center text-blue-700 max-w-3xl mx-auto mb-12">
                At MyHealthCare, we are committed to providing comprehensive and compassionate healthcare services tailored to your needs. Our team of experts uses the latest medical advancements to ensure your wellbeing and peace of mind. Explore our wide range of specialized services designed to keep you and your family healthy.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {services.map(({ name, icon: Icon, bg, iconColor }, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        <div className={`${bg} p-5 rounded-full mb-5`}>
                            <Icon className={`${iconColor} w-10 h-10`} />
                        </div>
                        <h3 className="text-xl font-semibold text-blue-800">{name}</h3>
                        <p className="mt-2 text-blue-600 text-sm">
                            Expert care & professional services to keep you healthy and happy.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurServices;
