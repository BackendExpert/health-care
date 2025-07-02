import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [activeTab, setActiveTab] = useState('login')
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' })

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/login', loginData)
            alert(res.data.message || 'Login successful!')
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed!')
        }
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/register', registerData)
            alert(res.data.message || 'Registration successful!')
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed!')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4 py-10">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
                {/* Tabs */}
                <div className="flex justify-between mb-8 border-b-2 border-blue-200 relative">
                    <button
                        className={`w-1/2 pb-2 text-lg font-semibold transition-colors duration-300 ${activeTab === 'login' ? 'text-blue-700' : 'text-blue-400'
                            }`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                        {activeTab === 'login' && (
                            <div className="h-1 bg-blue-700 rounded-full mt-2 w-full transition-all duration-300"></div>
                        )}
                    </button>
                    <button
                        className={`w-1/2 pb-2 text-lg font-semibold transition-colors duration-300 ${activeTab === 'register' ? 'text-blue-700' : 'text-blue-400'
                            }`}
                        onClick={() => setActiveTab('register')}
                    >
                        Register
                        {activeTab === 'register' && (
                            <div className="h-1 bg-blue-700 rounded-full mt-2 w-full transition-all duration-300"></div>
                        )}
                    </button>
                </div>

                {/* Forms */}
                {activeTab === 'login' ? (
                    <div className="">
                        <form onSubmit={handleLoginSubmit} className="space-y-6 mb-2">
                            <div>
                                <label className="block mb-1 text-blue-700 font-medium">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-blue-700 font-medium">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your password"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Login
                            </button>
                        </form>

                    </div>
                ) : (
                    <form onSubmit={handleRegisterSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-1 text-blue-700 font-medium">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your full name"
                                value={registerData.name}
                                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-blue-700 font-medium">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                value={registerData.email}
                                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-blue-700 font-medium">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Create a password"
                                value={registerData.password}
                                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Register
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Login
