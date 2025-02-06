import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from "../features/authSlice.js"
import { useLoginMutation } from "../features/userApiSlice.js";
import { toast } from 'react-toastify';


const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);
    console.log('Rendered userInfo:', userInfo);


    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            console.log('Login response:', res);
            dispatch(setCredentials({...res}));
            navigate(redirect);
        } catch (err) {
            console.error('Login error:', err);
            toast.error(err?.data?.message || err.error || 'Login failed');
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
            <div className="w-full max-w-3xl p-8">
                <h1 className="text-3xl font-semibold text-center text-gray-800 my-6">Sign In</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-100"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-100"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="py-3 px-5 bg-gray-500 text-gray-100 font-semibold rounded cursor mb-4"
                    >
                        Sign In
                    </button>
                </form>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">New Customer?</span>
                    <span className="text-sm font-medium">
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            Register
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
