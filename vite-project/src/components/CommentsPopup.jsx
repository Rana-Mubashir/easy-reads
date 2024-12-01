import { AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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

const CommentsPopup = ({ isOpen, setIsOpen, postId }) => {
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    if (isOpen) {
      getAllComments()
      const id = localStorage.getItem('userid')
      setUserId(id)
    }
  }, [isOpen])

  async function getAllComments() {
    console.log("postId", postId)
    try {
      const res = await axios.get(`/api/comment/getallcomments/${postId}/`)
      if (res) {
        setAllComments(res.data.comments)
        console.log("response for getting all comments", res)
      }
    } catch (error) {
      console.log("error in getting comments", error)
    }
  }

  async function handleSubmit() {
    const data = {
      userId: userId,
      postId: postId,
      comment: newComment
    }
    try {
      const res = await axios.post('/api/comment/addcomment/', data)
      if (res) {
        toast.success("Comment added sucessfully!")
        console.log("response for creating comment", res)
        setNewComment("")
      }
    } catch (error) {
      toast.error("Something went wrong while adding comment!")
      console.log("error in creating comments", error)
    }
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <>
      {isOpen && (
        <div
          className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-60"
          aria-hidden={!isOpen}
        >
          <div className="relative p-4 w-full max-w-lg max-h-full bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-700 rounded-t-lg">
              <h3 className="text-xl font-semibold text-white">Post Comments</h3>
              <button
                onClick={closeModal}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <AiOutlineClose className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {allComments && allComments.map((comment,index) => (
                <div key={index} className="flex items-start p-3 bg-gray-700 rounded-lg shadow-sm">
                  <img
                    src=""
                    alt={comment.user.userName}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <h4 className="font-semibold text-white">{comment.user.username}</h4>
                      <span className="ml-2 text-sm text-gray-400">{Date.now()}</span>
                    </div>
                    <p className="text-gray-300 mt-2">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-700">
              <textarea
                className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
              ></textarea>
              <button
                onClick={() => handleSubmit()}
                className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2 hover:bg-blue-700 focus:outline-none"
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
