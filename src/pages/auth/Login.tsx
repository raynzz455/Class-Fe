import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setAuthData } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { email, password });

            if (response.data && response.data.access_token) {
                const token = response.data.access_token;
                const role = 'user';
                setAuthData(token, role);

                navigate('/dashboard/students');
            }
        } catch (error) {
            setError('Login failed. Please check your credentials and try again.');
            console.error('Login failed for user', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-lg lg:max-w-md md:max-w-sm sm:max-w-xs shadow-[6px_6px_0px_blue] ring-1 ring-blue-400  bg-white p-8 rounded-lg transition-all ease-in-out duration-300">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none hover:ring-2 hover:ring-blue-400 focus:shadow-[5px_5px_0px_blue] focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-600 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-2 border rounded-md hover:ring-2 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:shadow-[5px_5px_0px_blue] focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-xl hover:scale-105 hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
