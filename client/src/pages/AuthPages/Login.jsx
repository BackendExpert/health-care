import React, { useState } from 'react'
import axios from 'axios'
import DefaultInput from '../../components/Form/DefaultInput'
import DefaultBtn from '../../components/Buttons/DefultBtn'

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
        <div className="bg-blue-50 min-h-screen flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                {/* Tabs */}
                <div className="flex justify-around mb-8">
                    <button
                        onClick={() => setActiveTab('login')}
                        className={`py-2 w-1/2 font-semibold rounded-tl-2xl rounded-bl-2xl 
              ${activeTab === 'login' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-700'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setActiveTab('register')}
                        className={`py-2 w-1/2 font-semibold rounded-tr-2xl rounded-br-2xl 
              ${activeTab === 'register' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-700'}`}
                    >
                        Register
                    </button>
                </div>

                {/* Forms */}
                {activeTab === 'login' ? (
                    <form onSubmit={handleLoginSubmit}>
                        <DefaultInput
                            label="Email Address"
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            placeholder="Enter your email"
                            required
                        />
                        <DefaultInput
                            label="Password"
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            placeholder="Enter your password"
                            required
                        />
                        <div className="mt-6 text-center">
                            <DefaultBtn type="submit" label="Login" />
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleRegisterSubmit}>
                        <DefaultInput
                            label="Full Name"
                            type="text"
                            name="name"
                            value={registerData.name}
                            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                            placeholder="Enter your full name"
                            required
                        />
                        <DefaultInput
                            label="Email Address"
                            type="email"
                            name="email"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            placeholder="Enter your email"
                            required
                        />
                        <DefaultInput
                            label="Password"
                            type="password"
                            name="password"
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                            placeholder="Create a password"
                            required
                        />
                        <div className="mt-6 text-center">
                            <DefaultBtn type="submit" label="Register" />
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Login
