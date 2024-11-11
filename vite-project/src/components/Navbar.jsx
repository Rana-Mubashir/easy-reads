import React from 'react'
import { IoMdNotifications } from "react-icons/io";

function Navbar() {
    return (
        <div className='flex justify-between items-center p-1 bg-blue-400 border-b-4 border-transparent '>
            <div className="max-h-20 max-w-36  rounded-lg">
                <img src="https://ik.imagekit.io/zugnpkswv/download.png?updatedAt=1731331465086" alt="" />
            </div>
            <div className="">
                <div className="flex items-center">
                    <input type="text"
                        placeholder='Enter name'
                        className='p-3 min-w-96 rounded-3xl rounded-r-none '
                    />
                    <button
                        className='bg-black py-3 px-6 rounded-3xl rounded-l-none text-white'
                    >Search</button>
                </div>
            </div>
            <div className="flex items-center justify-between gap-5">
                <div className="relative flex items-center justify-center">
                    <p className="absolute -top-1.5 -right-1.5 text-xs text-white bg-red-600 rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                        0
                    </p>
                    <IoMdNotifications className="text-white text-2xl hover:text-gray-300 transition duration-200 ease-in-out" />
                </div>
                <div className="flex flex-col items-center gap-2 p-2  rounded-lg  ">
                    <img
                        src="https://source.unsplash.com/random/100x100"
                        alt="User Profile"
                        className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm object-contain"
                    />
                    <p className="text-center text-gray-700 font-medium text-sm">User Name</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar
