import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

const AddBlogPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState('');
  const [userId, setUserId] = useState('');
  const [suggestedDescriptions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('userid');
    setUserId(id);
  }, []);

  const handleTitleChange = (e) => setTitle(e.target.value);

  function decodeHtmlEntities(str) {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.documentElement.textContent || str;
  }

  const handleDescriptionChange = async (content) => {
    setDescription(content);
    const decodedContent = decodeHtmlEntities(content)
    const plainText = decodedContent.replace(/<\/?[^>]+(>|$)/g, "").replace(/\\u[\dA-Fa-f]{4}/g, match => String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))); if (plainText.length >= 3) {
      try {
        const response = await axios.post(
          'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B', // GPT-Neo model API
          {
            inputs: plainText
          },
          {
            headers: {
              'Authorization': `Bearer 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`, // Replace with your API key
            },
          }
        );

        console.log("response for suggestion", response);
        if (response.data && response.data.length > 0) {
          const generatedText = response.data[0]?.generated_text;
          if (generatedText) {
            const cleanedText = generatedText.replace(/<\/?[^>]+(>|$)/g, "").replace(/\\u[\dA-Fa-f]{4}/g, match => String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16)));
            setSuggestions([cleanedText.trim()]);
          } else {
            setSuggestions(['No suggestions available.']);
          }
        } else {
          setSuggestions(['No suggestions available.']);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions(['Failed to fetch suggestions.']);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setShowImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    try {
      const res = await axios.post('/api/post/createpost/', formData);
      if (res) {
        toast.success("New Blog is Created Successfully!");
        navigate('/');
      }
    } catch (error) {
      toast.error("Something went wrong while creating new blog!");
      console.log("error in creating post", error);
    }
  };

  const handleDescriptionSuggestionClick = (suggestion) => {
    setDescription(suggestion); // Set the clicked suggestion as the description
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg mt-10">
      <h2 className="text-5xl font-semibold text-center mb-5 underline font-mono">Add New Blog</h2>

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
            src={showImage}
            alt="Preview"
            className="mt-4 w-full rounded-lg"
            style={{ maxHeight: '500px', objectFit: 'contain' }}
          />
        )}
      </div>

      {/* TinyMCE Editor for Description */}
      <div className="mb-6 relative">
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

        {/* Suggestions for Description */}
        {
          suggestedDescriptions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-gray-700 mt-2 rounded-lg shadow-lg z-10 max-h-60 overflow-auto">
              {/* Close button */}
              <div className="absolute top-2 right-2 cursor-pointer" onClick={() => setSuggestions([])}>
                <IoClose size={20} className="text-white" />
              </div>

              {/* Suggested descriptions */}
              {suggestedDescriptions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleDescriptionSuggestionClick(suggestion)}
                  className="p-4 cursor-pointer hover:bg-blue-600 transition duration-200"
                >
                  <p className="text-white">{suggestion}</p>
                </div>
              ))}
            </div>
          )
        }
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
