import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { convert } from 'html-to-text';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const UpdateBlogPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState('')
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()
  const {postId}=useParams()
  const BASEURL = "http://127.0.0.1:8000";


  useEffect(() => {
    const id = localStorage.getItem('userid')
    setUserId(id)
    
  }, [])

  useEffect(() => {
    getPost()
  } ,[postId])

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (content) => setDescription(content);

  function handleImageChange(e) {
    setImage(e.target.files[0])
    setShowImage(URL.createObjectURL(e.target.files[0]))
  }

  async function handleUpdatePost(){
    try {
        const res=await axios.put(`/api/post/updatepost/${postId}/`)
        if(res){
            console.log("response for updation",res)
            toast.success("Post Updated Sucessfully!")
            navigate('/')
        }
    } catch (error) {
        toast.error("Something went wrong while updating the post !")
        console.log("error in updating the post",error)
    }
  }

  async function getPost(){
    try {
        const res=await axios.get(`/api/post/getpostbyid/${postId}/`)
        if(res){
            console.log("response for getting post",res)
            setTitle(res.data.data.title)
            setDescription(res.data.data.description)
            setImage(res.data.data.image)

        }
    } catch (error) {
        console.log("error in getting post",error)
    }
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-10">
      <h2 className="text-5xl font-semibold text-center mb-5 underline font-mono">Update Blog</h2>

      {/* Title Input */}
      <div className="mb-6">
        <label htmlFor="title" className="block text-lg font-medium mb-2">Blog Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter blog title"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label htmlFor="image" className="block text-lg font-medium mb-2">Featured Image</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none"
        />
        {image && (
          <img
            src={showImage ? showImage : (BASEURL+image)}
            alt="Preview"
            className="mt-4 w-full rounded-lg"
            style={{ maxHeight: '500px',objectFit:'contain' }} // Limit height and maintain aspect ratio
          />
        )}
      </div>

      {/* TinyMCE Editor */}
      <div className="mb-6">
        <label htmlFor="description" className="block text-lg font-medium mb-2">Blog Description</label>
        <Editor
          apiKey="dfgtc1e8hq2s2lwlv8xup43nlclag1l6q8up1cknp1q67vdh" // Your API Key
          value={description}
          init={{
            height: 300,
            menubar: false,
            plugins: ['link', 'image', 'lists'],
            toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image',
          }}
          onEditorChange={handleDescriptionChange}
          className="w-full bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleUpdatePost}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Update Blog
        </button>
      </div>
    </div>
  );
};

export default UpdateBlogPage;
