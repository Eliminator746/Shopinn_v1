import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const { userInfo } = useSelector((state) => state.auth)
    const name = userInfo.data.user.name;
    console.log(userInfo.data.user.name);

    // Handle clicks outside the dropdown and Escape key
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') setIsOpen(false);
        };

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

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
                    <li
                        onClick={() => setIsOpen(false)}
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
