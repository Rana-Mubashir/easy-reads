import React from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { FaPlus, FaSignOutAlt, FaSearch } from 'react-icons/fa';

function Navbar() {
    return (
        <div className='flex justify-between items-center bg-gray-800 px-8 py-2 shadow-md'>
            {/* Logo Section */}
            <Link to=''>
                <div className="max-h-36 max-w-36 rounded-lg">
                    <img src="https://ik.imagekit.io/zugnpkswv/download-removebg-preview.png?updatedAt=1731424653387" alt="Logo" className="w-20 h-auto" />
                </div>
            </Link>

            {/* Search Section */}
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-full max-w-md">
                <div className="flex items-center justify-center  p-3">
                    <FaSearch className="text-gray-500 text-lg" />
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    className="p-2 w-full bg-transparent focus:outline-none text-white"
                />
            </div>
            {/* Right Section */}
            <div className="flex items-center gap-6">
                {/* Notification Icon */}
                <div className="relative flex items-center justify-center">
                    <span className="absolute -top-2 -right-2 text-xs text-white bg-red-600 rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                        0
                    </span>
                    <IoMdNotifications className="text-white text-3xl cursor-pointer hover:text-gray-300 transition duration-200" />
                </div>

                <div className="flex items-center flex-col gap-2">
                    <img
                        src="https://source.unsplash.com/random/100x100"
                        alt="User Profile"
                        className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover"
                    />
                </div>
                <Link to='/addnewblog'>
                <button className="text-white px-5 py-2 rounded border-2 hover:bg-gray-500 font-medium transition duration-200 flex items-center space-x-2">
                    <FaPlus className="text-lg" />
                    <span>Add New</span>
                </button>
                </Link>

                <button className="text-white px-5 py-2 rounded border-2 hover:bg-gray-500 font-medium transition duration-200 flex items-center space-x-2">
                    <FaSignOutAlt className="text-lg" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}

export default Navbar;
