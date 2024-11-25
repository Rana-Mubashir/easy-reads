import { FaHeart, FaComment } from 'react-icons/fa';
import { useState } from 'react';
import CommentsPopup from './CommentsPopup';
import { Link } from 'react-router-dom';

function BlogCard({ imageUrl, title, description, likes, comments, userInfo, postDate }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="max-w-sm rounded-lg overflow-hidden shadow-l bg-gray-800 transition-shadow duration-300 ease-in-out hover:shadow-xl">
                {/* User Info */}
                <div className="flex items-center p-4 ">
                    <img
                        src=''
                        className="w-10 h-10 rounded-full mr-3 border border-gray-200 shadow-sm"
                    />
                    <div>
                        <h3 className=" text-white font-semibold ">{userInfo.name}</h3>
                        <p className="text-xs text-gray-400">{postDate}</p>
                    </div>
                </div>

                {/* Post Image */}
                <div className="relative h-80 w-full">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="rounded-t-lg w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    <h2 className="font-bold text-xl mb-2 text-gray-800 dark:text-white">{title}</h2>
                    <p className="text-gray-300 text-base">{description}</p>
                </div>

                {/* Actions */}
                <div className="px-6 pt-4 pb-2 flex justify-between items-center border-t-2 border-slate-400 ">
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-400  dark:hover:text-red-400 transition-colors duration-300">
                            <FaHeart className="h-5 w-5" />
                            <span>{likes}</span>
                        </button>
                        <button
                            className="flex items-center space-x-1 text-gray-400  dark:hover:text-blue-400 transition-colors duration-300"
                            onClick={() => setIsOpen(true)}
                        >
                            <FaComment className="h-5 w-5" />
                            <span>{comments}</span>
                        </button>
                    </div>
                    <Link to='/blogdetailpage'>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                            Read More
                        </button>
                    </Link>

                </div>
            </div>
            {/* Comments Popup */}
            <CommentsPopup
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    );
}

export default BlogCard;
