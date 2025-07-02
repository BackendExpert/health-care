import React from 'react';
import { MdError } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const DashError = () => {
    const navigate = useNavigate();

    return (
        <div className="py-32 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="bg-white/60 backdrop-blur-lg border border-blue-200 rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center max-w-md">
                <MdError className="h-20 w-20 text-red-500 animate-bounce mb-6" />

                <h1 className="text-4xl font-bold text-gray-700 mb-4 tracking-wider">
                    503 Service Unavailable
                </h1>

                <p className="text-gray-600 mb-6">
                    The server is temporarily unable to handle your request.
                    <br /> This page is under development. Please check back soon.
                </p>

                <button
                    onClick={() => navigate('/Dashboard/Home')}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default DashError;
