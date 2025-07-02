import React from 'react'
import { Link } from 'react-router-dom'
import { FaSadTear } from 'react-icons/fa'

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 p-6">
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-6 bg-white rounded-full shadow-lg animate-bounce">
                        <FaSadTear className="text-indigo-600 text-5xl" />
                    </div>
                </div>
                <h1 className="text-6xl font-extrabold text-indigo-700 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Oops! Page not found.</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    The page you’re looking for doesn’t exist or has been moved. Please check the URL or return to the homepage.
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )
}

export default NotFound
