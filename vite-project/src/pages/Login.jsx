import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function Login() {

    const { register, handleSubmit } = useForm()
    const navigate=useNavigate()

    async function login(data) {
        console.log("data for login", data.email)
        try {
            const res = await axios.post('/api/user/login/', data)
            if (res) {
                console.log("response for login", res)
                localStorage.setItem('isUser', true)
                localStorage.setItem('email', res.data.data.email)
                localStorage.setItem('userid', res.data.data.userid)
                navigate('/')
            }
        } catch (error) {
            console.log("error in login", error)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-10 space-y-8 bg-gray-800 rounded-xl shadow-xl">
                <h2 className="text-3xl font-semibold text-center text-gray-100">Login</h2>

                {/* Login Form */}
                <form className="mt-6 space-y-6" onSubmit={handleSubmit(login)}>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            {...register('email', { required: true })}
                            className="w-full px-4 py-3 mt-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            {...register('password', { required: true })}
                            className="w-full px-4 py-3 mt-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        Login
                    </button>

                    {/* Forgot Password or Sign-Up Link */}
                    <div className="text-center mt-4 text-sm text-gray-400">
                        <a href="/forgot-password" className="text-blue-400 hover:text-blue-300">
                            Forgot password?
                        </a>
                        <span className="mx-2">|</span>
                        <a href="/signup" className="text-blue-400 hover:text-blue-300">
                            Don't have an account? Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
