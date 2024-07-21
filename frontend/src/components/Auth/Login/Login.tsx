import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import validator from 'validator';
import axios from 'axios';
import api from '../../api/api';
import styles from '../../navbar/Navbar.module.css';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const text = "Don't have an account?";

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        if (validator.isEmail(value)) {
            setEmailError('');
        } else {
            setEmailError('Please enter a valid email address');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (emailError) {
            alert('Please fix the errors before submitting.');
            return;
        }

        try {
            const response = await axios.post(`${api}api/auth/login`, {
                email,
                password,
            });

            console.log('Login successful:', response.data);
            navigate('/');
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                console.error('Login failed:', err.response ? err.response.data : err.message);
            } else {
                console.error('Login failed:', err);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <form onSubmit={handleSubmit} className={`p-6 rounded-lg shadow-lg w-full max-w-sm ${styles.navbar}`}>
                <h2 className="text-2xl font-bold mb-6 text-white">Login to Spendlify</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    />
                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>
                <div className="mb-4 relative">
                    <label htmlFor="password" className="block text-sm font-medium text-white mb-2">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 pr-10"
                        />
                        <span
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                        </span>
                    </div>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Login</button>
                <div className="mt-4 text-center">
                    <p>{text}
                        <Link to="/signup" className="hover:underline text-white">Signup</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login;
