import { AiOutlineClose } from 'react-icons/ai'; // Close icon
import { useState } from 'react';

const comments = [
  {
    id: 1,
    userName: "John Doe",
    userImage: "https://randomuser.me/api/portraits/men/1.jpg",
    comment: "This is a sample comment from John Doe. Really love the content here!",
    date: "2024-11-10 14:30",
  },
  {
    id: 2,
    userName: "Jane Smith",
    userImage: "https://randomuser.me/api/portraits/women/1.jpg",
    comment: "I totally agree with the points mentioned, this is very helpful!",
    date: "2024-11-09 09:15",
  },
];

const CommentsPopup = ({ isOpen, setIsOpen }) => {
  const [newComment, setNewComment] = useState(""); 

  const closeModal = () => {
    setIsOpen(false); 
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value); 
  };

  const handleSubmit = () => {
    if (newComment) {
      console.log("New Comment:", newComment);
      setNewComment(""); 
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
          aria-hidden={!isOpen}
        >
          <div className="relative p-4 w-full max-w-lg max-h-full bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b rounded-t-lg">
              <h3 className="text-xl font-semibold text-gray-900">Post Comments</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <AiOutlineClose className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start p-3 bg-gray-50 rounded-lg shadow-sm">
                  <img
                    src={comment.userImage}
                    alt={comment.userName}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <h4 className="font-semibold text-gray-800">{comment.userName}</h4>
                      <span className="ml-2 text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-700 mt-2">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
              ></textarea>
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white py-2 rounded-lg mt-2 hover:bg-blue-600"
              >
                Submit Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentsPopup;
