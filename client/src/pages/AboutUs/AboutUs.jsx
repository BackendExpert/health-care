import React from 'react'
import { FaHeartbeat, FaUserMd, FaHospitalAlt, FaRegSmile, FaStethoscope, FaAmbulance } from "react-icons/fa";

const AboutUs = () => {
    return (
        <div className="bg-blue-50 text-gray-800 pt-16">
            {/* Header */}
            <div className="bg-blue-700 text-white py-20 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">About Our Healthcare System</h1>
                <p className="max-w-2xl mx-auto text-lg">
                    Dedicated to delivering world-class healthcare services with compassion and advanced technology.
                </p>
            </div>

            {/* About section */}
            <div className="py-20 px-4 xl:px-32">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-blue-700 mb-6">Who We Are</h2>
                    <p className="text-gray-700 text-lg mb-8">
                        We are a leading healthcare system committed to excellence in medical services, patient care, and innovation.
                        Our mission is to enhance the health and well-being of our community through compassionate care and cutting-edge treatments.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
                        <h3 className="text-2xl font-bold text-blue-700 mb-4">Our Mission</h3>
                        <p className="text-gray-600">
                            To provide exceptional healthcare services that improve the quality of life for our patients,
                            delivered with empathy, respect, and integrity.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
                        <h3 className="text-2xl font-bold text-blue-700 mb-4">Our Vision</h3>
                        <p className="text-gray-600">
                            To be the most trusted healthcare partner, recognized for innovative treatments,
                            outstanding professionals, and patient-centered care.
                        </p>
                    </div>
                </div>
            </div>

            {/* Services / Highlights */}
            <div className="bg-blue-100 py-20 px-4 xl:px-32">
                <h2 className="text-3xl font-bold text-blue-700 text-center mb-12">What We Offer</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
                        <FaHeartbeat className="text-blue-600 text-5xl mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Cardiology</h3>
                        <p className="text-gray-600">Advanced heart care with modern diagnostics and treatments.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
                        <FaUserMd className="text-blue-600 text-5xl mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
                        <p className="text-gray-600">Our skilled physicians ensure top-quality medical attention.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
                        <FaHospitalAlt className="text-blue-600 text-5xl mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Modern Facilities</h3>
                        <p className="text-gray-600">State-of-the-art infrastructure designed for patient comfort and safety.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
                        <FaStethoscope className="text-blue-600 text-5xl mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Comprehensive Checkups</h3>
                        <p className="text-gray-600">Routine screenings to keep you and your family healthy.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
                        <FaAmbulance className="text-blue-600 text-5xl mb-4" />
                        <h3 className="text-xl font-semibold mb-2">24/7 Emergency</h3>
                        <p className="text-gray-600">Rapid response and care for any medical emergencies.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
                        <FaRegSmile className="text-blue-600 text-5xl mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Patient Satisfaction</h3>
                        <p className="text-gray-600">We focus on delivering a caring, positive patient experience.</p>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="py-20 px-4 xl:px-32">
                <h2 className="text-3xl font-bold text-blue-700 text-center mb-12">Why Choose Us</h2>
                <div className="max-w-4xl mx-auto text-center text-lg text-gray-700">
                    <p className="mb-6">
                        We blend advanced technology with personalized attention to ensure the best outcomes for our patients.
                        With a dedicated team of professionals, modern facilities, and a patient-first philosophy,
                        we strive to be your trusted partner in health.
                    </p>
                    <p>
                        From preventive care to complex surgeries, we uphold the highest standards of quality and safety,
                        so you can focus on living your healthiest life.
                    </p>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-700 text-white py-16 px-4 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to experience exceptional healthcare?</h3>
                <p className="max-w-2xl mx-auto mb-6">
                    Contact us today to book an appointment or learn more about our services.
                </p>
                <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition">
                    Contact Us
                </button>
            </div>
        </div>
    )
}

export default AboutUs
