import { FaHeart, FaComment } from 'react-icons/fa';
import { useState } from 'react';
import CommentsPopup from './CommentsPopup';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { FaTrash, FaEdit } from 'react-icons/fa';

function BlogCard({ imageUrl, title, description, likes, comments, userInfo, postDate, deleteBlog, postId }) {
    const [isOpen, setIsOpen] = useState(false);
    const BASEURL = "http://127.0.0.1:8000";
    const MAX_DESCRIPTION_LENGTH = 150;

    const truncatedDescription = description.length > MAX_DESCRIPTION_LENGTH
        ? description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
        : description;
    return (
        <>
            <div className="max-w-lg rounded-lg overflow-hidden shadow-lg bg-gray-800 transition-shadow duration-300 ease-in-out hover:shadow-xl">
                {/* User Info */}
                <div className="flex items-center justify-between p-3">
                    <div className="flex items-center p-4">
                        <img
                            src={BASEURL + imageUrl}
                            className="w-12 h-12 rounded-full mr-3 border border-gray-200 shadow-sm"
                            alt={userInfo.name}
                        />
                        <div>
                            <h3 className="text-white font-semibold">{userInfo.username}</h3>
                            <p className="text-xs text-gray-400">{Date.now}</p>
                        </div>
                    </div>
                    {
                        parseInt(localStorage.getItem('userid')) === userInfo.id && (
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => deleteBlog(postId)}
                                    className="text-gray-500 hover:text-red-500 p-2 rounded-full transition-colors duration-300"
                                    title="Delete"
                                >
                                    <FaTrash size={20} />
                                </button>
                                <Link to={`/update/${postId}`} title="Update">
                                    <button className="text-gray-500 hover:text-green-500 p-2 rounded-full transition-colors duration-300">
                                        <FaEdit size={20} />
                                    </button>
                                </Link>
                            </div>
                        )
                    }
                </div>

                {/* Post Image */}
                <div className="relative h-60 w-full">
                    <img
                        src={BASEURL + imageUrl}
                        alt={title}
                        className="rounded-t-lg w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                    <h2 className="font-bold text-xl mb-2  text-white">{title}</h2>
                    <p
                        className="text-gray-300 text-base"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncatedDescription) }}
                    />
                </div>

                {/* Actions */}
                <div className="px-6 pt-4 pb-2 flex justify-between items-center border-t-2 border-slate-400">
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors duration-300">
                            <FaHeart className="h-5 w-5" />
                            <span>{likes}</span>
                        </button>
                        <button
                            className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors duration-300"
                            onClick={() => setIsOpen(true)}
                        >
                            <FaComment className="h-5 w-5" />
                            <span>{comments}</span>
                        </button>
                    </div>
                    <Link to={`/blogdetailpage/${postId}`}>
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
                postId={postId}
            />
        </>
    );
}

export default BlogCard;
