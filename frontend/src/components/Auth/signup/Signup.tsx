import { Eye, EyeOff } from 'lucide-react';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import api from '../../api/api';
import styles from '../../navbar/Navbar.module.css';

const Signup: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

    const text: string = "Already have an account?";

    const togglePasswordVisibility = (): void => {
        setShowPassword(prevState => !prevState);
    };

    const toggleConfirmPasswordVisibility = (): void => {
        setShowConfirmPassword(prevState => !prevState);
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setEmail(value);

        if (validator.isEmail(value)) {
            setEmailError('');
        } else {
            setEmailError('Please enter a valid email address');
        }
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setPassword(value);

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        if (!passwordRegex.test(value)) {
            setPasswordError('Password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setConfirmPassword(value);

        if (value !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        if (emailError || passwordError || confirmPasswordError) {
            alert('Please fix the errors before submitting.');
            return;
        }

        try {
            const response = await axios.post(`${api}api/auth/register`, {
                name,
                email,
                password,
            });

            console.log('Registration successful:', response.data);
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                console.error('Registration failed:', err.response ? err.response.data : err.message);
            } else {
                console.error('Registration failed:', err);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className={` p-6 rounded-lg shadow-lg w-full max-w-sm ${styles.navbar}`}>
                <h2 className="text-2xl font-bold mb-6 text-white">Sign Up to Spendlify</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    />
                </div>
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
                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                </div>
                <div className="mb-6 relative">
                    <label htmlFor="confirmpassword" className="block text-sm font-medium text-white mb-2">Confirm Password</label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmpassword"
                            id="confirmpassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300 pr-10"
                        />
                        <span
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                        </span>
                    </div>
                    {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Sign Up</button>
                <div className="mt-4 text-center">
                    <p>{text}
                        <Link to="/login" className="text-white hover:underline">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Signup;
