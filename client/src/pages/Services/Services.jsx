import React from 'react'
import { FaHeartbeat, FaUserMd, FaHospitalAlt, FaRegSmile, FaStethoscope, FaAmbulance } from "react-icons/fa";

const Services = () => {
    return (
        <div className="bg-blue-50 text-gray-800 pt-16">
            {/* Header */}
            <div className="bg-blue-700 text-white py-20 px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Our Healthcare Services</h1>
                <p className="max-w-2xl mx-auto text-lg">
                    Delivering a complete range of high-quality medical services to keep you and your family healthy.
                </p>
            </div>

            {/* Services grid */}
            <div className="py-20 px-4 xl:px-32">
                <h2 className="text-3xl font-bold text-blue-700 text-center mb-12">Explore Our Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition duration-300 overflow-hidden">
                        <FaHeartbeat className="text-blue-600 text-5xl mb-4 transition-transform duration-300 group-hover:scale-110" />
                        <h3 className="text-xl font-semibold mb-2">Cardiology</h3>
                        <p className="text-gray-600 mb-6">From diagnostics to advanced treatments, we ensure your heart stays healthy.</p>
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300"></div>
                    </div>
                    <div className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition duration-300 overflow-hidden">
                        <FaUserMd className="text-blue-600 text-5xl mb-4 transition-transform duration-300 group-hover:scale-110" />
                        <h3 className="text-xl font-semibold mb-2">Expert Consultations</h3>
                        <p className="text-gray-600 mb-6">Access to top medical specialists who listen and care.</p>
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300"></div>
                    </div>
                    <div className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition duration-300 overflow-hidden">
                        <FaHospitalAlt className="text-blue-600 text-5xl mb-4 transition-transform duration-300 group-hover:scale-110" />
                        <h3 className="text-xl font-semibold mb-2">Inpatient Care</h3>
                        <p className="text-gray-600 mb-6">Modern hospital facilities designed for comfort and safety.</p>
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300"></div>
                    </div>
                    <div className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition duration-300 overflow-hidden">
                        <FaStethoscope className="text-blue-600 text-5xl mb-4 transition-transform duration-300 group-hover:scale-110" />
                        <h3 className="text-xl font-semibold mb-2">Health Screenings</h3>
                        <p className="text-gray-600 mb-6">Routine checkups & diagnostic tests to catch issues early.</p>
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300"></div>
                    </div>
                    <div className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition duration-300 overflow-hidden">
                        <FaAmbulance className="text-blue-600 text-5xl mb-4 transition-transform duration-300 group-hover:scale-110" />
                        <h3 className="text-xl font-semibold mb-2">Emergency Services</h3>
                        <p className="text-gray-600 mb-6">24/7 immediate care for urgent medical situations.</p>
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300"></div>
                    </div>
                    <div className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition duration-300 overflow-hidden">
                        <FaRegSmile className="text-blue-600 text-5xl mb-4 transition-transform duration-300 group-hover:scale-110" />
                        <h3 className="text-xl font-semibold mb-2">Patient Care & Support</h3>
                        <p className="text-gray-600 mb-6">Compassionate staff who prioritize your well-being and comfort.</p>
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300"></div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-blue-100 py-20 px-4 xl:px-32">
                <h2 className="text-3xl font-bold text-blue-700 text-center mb-12">Why Trust Our Services</h2>
                <div className="max-w-4xl mx-auto text-center text-lg text-gray-700">
                    <p className="mb-6">
                        We combine cutting-edge medical expertise with compassionate, personalized attention.
                        Our dedicated teams work tirelessly to ensure that each patient receives the highest quality of care.
                    </p>
                    <p>
                        With our comprehensive range of services, advanced facilities, and unwavering commitment to excellence,
                        we aim to be your lifelong healthcare partner.
                    </p>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-blue-700 text-white py-16 px-4 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to take charge of your health?</h3>
                <p className="max-w-2xl mx-auto mb-6">
                    Schedule a consultation or learn more about how we can help you live your healthiest life.
                </p>
                <a href="/login">
                    <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition">
                        Book an Appointment
                    </button>
                </a>
            </div>
        </div>
    )
}

export default Services
