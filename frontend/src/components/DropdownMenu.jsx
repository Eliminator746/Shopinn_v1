import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../features/authSlice";
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/userApiSlice';

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const { userInfo } = useSelector((state) => state.auth)
    const name = userInfo.data.user.name;
    const isAdmin = userInfo.data.user.isAdmin

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();
    // console.log('logoutApiCall : ', logoutApiCall);
    

    // Handle clicks outside the dropdown and Escape key
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    const logoutHandler = async () => {
        try {
            setIsOpen(false)

            // Ensure userInfo exists before making API call
            if (!userInfo) {
                console.log("User not found, skipping logout API call.");
                return;
            }
            await logoutApiCall().unwrap()

            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.log('error : ', error);
        }
    }

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="text-white text-md rounded-full bg-gray-500 w-8 h-8 flex items-center justify-center"
            >
                {name.split('')[0]}
            </div>

            {isOpen && (
                <ul className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-md">
                    <li
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                        Profile
                    </li>
                    {
                        isAdmin && (
                            <li
                                onClick={() => {setIsOpen(false); navigate('/admin/orderlist')}}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"                               
                            >
                                OrderList
                            </li>
                        )
                    }
                    {
                        isAdmin && (
                            <li
                                onClick={() => {setIsOpen(false); navigate('/admin/productlist')}}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"                               
                            >
                                ProductList
                            </li>
                        )
                    }
                    <li
                        onClick={logoutHandler}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                        Logout
                    </li>
                </ul>
            )}
        </div>
    );
};

export { DropdownMenu };
