import React from 'react';

function BlogDetailPage() {
  // Dummy data for the blog post
  const blogData = {
    imageUrl: "https://picsum.photos/200/300?random=1",
    title: "Exploring the Beauty of Nature",
    author: {
      name: "Jane Doe",
      profileImage: "https://source.unsplash.com/random/100x100?profile",
    },
    date: "October 28, 2024",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum odio et tortor pulvinar, sit amet condimentum magna laoreet.
    
    Curabitur cursus, nibh non posuere euismod, arcu tortor gravida odio, vitae bibendum nisi erat eget quam. Fusce et neque eu ligula cursus hendrerit. Duis a odio eu est finibus luctus.
    
    Vivamus posuere est nec ullamcorper blandit. Integer volutpat pharetra neque, at hendrerit leo efficitur ut. Integer et metus ac ligula fringilla commodo.
    
    Suspendisse et consectetur lectus. Phasellus maximus turpis vel dui fermentum, ut sollicitudin tortor scelerisque.`,
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-gray-300">
      {/* Header Image */}
      <div className="w-full h-96 mb-6">
        <img
          src={blogData.imageUrl}
          alt={blogData.title}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Blog Content */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-4">{blogData.title}</h1>

        {/* Author & Date */}
        <div className="flex items-center mb-6">
          <img
            src={blogData.author.profileImage}
            alt={blogData.author.name}
            className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-700"
          />
          <div>
            <p className="text-gray-400 font-semibold">{blogData.author.name}</p>
            <p className="text-gray-500 text-sm">{blogData.date}</p>
          </div>
        </div>

        {/* Content */}
        <div className="leading-relaxed text-lg space-y-4">
          {blogData.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogDetailPage;
