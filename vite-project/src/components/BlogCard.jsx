import { FaHeart, FaComment, FaCircle } from 'react-icons/fa';
import { useState } from 'react';
import CommentsPopup from './CommentsPopup';

function BlogCard({ imageUrl, title, description, likes, comments }) {

    const [isOpen, setIsOpen] = useState(false)
    const [postComments, setPostComments] = useState([])

    return (
        <>
            <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-shadow duration-300 ease-in-out hover:shadow-xl">
                <div className="relative h-60 w-full">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="rounded-t-lg w-full h-full object-contain"
                    />
                </div>
                <div className="px-6 py-4">
                    <h2 className="font-bold text-xl mb-2 text-gray-800 dark:text-white">{title}</h2>
                    <p className="text-gray-700 dark:text-gray-300 text-base">{description}</p>
                </div>
                <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300">
                            <FaHeart className="h-5 w-5" />
                            <span>{likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                        onClick={() => setIsOpen(true)}
                        >
                            <FaComment className="h-5 w-5" />
                            <span>{comments}</span>
                        </button>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                        Read More
                    </button>
                </div>
            </div>

            <CommentsPopup
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    )
}

export default BlogCard;
