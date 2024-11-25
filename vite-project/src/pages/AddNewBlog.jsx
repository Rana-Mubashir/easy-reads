import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { convert } from 'html-to-text';
import axios from 'axios';

const AddBlogPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const id = localStorage.getItem('userid')
    setUserId(id)
  }, [])

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (content) => setDescription(content);
  const handleImageChange = (e) => setImage(URL.createObjectURL(e.target.files[0]));

  const handleSubmit = async () => {
    const plainText = convert(description, {
      wordwrap: 130, // Optional word wrapping
    });
    const data = {
      userId: userId,
      title: title,
      description: plainText,
      image: image
    }
    try {
      const res = await axios.post('/api/post/createpost/', data)
      if (res) {
        console.log("response for creating post", res)
      }
    } catch (error) {
      console.log("error in creating post", error)
    }

  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-semibold text-center mb-8">Add New Blog</h2>

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
        {image && <img src={image} alt="Preview" className="mt-4 w-full rounded-lg" />}
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
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add new Blog
        </button>
      </div>
    </div>
  );
};

export default AddBlogPage;
