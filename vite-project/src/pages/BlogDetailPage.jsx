import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';


function BlogDetailPage() {
  const BASEURL = "http://127.0.0.1:8000";
  const [data, setData] = useState({})
  const { postId } = useParams()

  useEffect(() => {
    getPost()
  }, [postId])

  async function getPost() {
    try {
      const res = await axios.get(`/api/post/getpostbyid/${postId}/`)
      if (res) {
        console.log("response for getting post", res)
        setData(res.data.data)
      }
    } catch (error) {
      console.log("error in getting post", error)
    }
  }

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-gray-300">
      {/* Header Image */}
      <div className="w-full  mb-6">
        <img
          src={BASEURL + data.image}
          alt={data.title}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Blog Content */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-4">{data.title}</h1>

        {/* Author & Date */}
        <div className="flex items-center mb-6">
          <img
            src='https://ik.imagekit.io/zugnpkswv/th.jpg?updatedAt=1733090599812'
            // alt={data.user.username}
            className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-700"
          />
          <div>
            {/* <p className="text-gray-400 font-semibold">{data.user.userName}</p> */}
            <p className="text-gray-500 text-sm">{Date.now()}</p>
          </div>
        </div>

        {/* Content */}
        <div className="leading-relaxed text-lg space-y-4">
          <p
            className="text-gray-300 text-base"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogDetailPage;
