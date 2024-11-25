import React from 'react'
import BlogCard from '../../../components/BlogCard';
import { useState,useEffect } from 'react';
import CommentsPopup from '../../../components/CommentsPopup'
import axios from 'axios';


function LandingBlogSec() {
    const [isOpen, setIsOpen] = useState(false)
    const [blogs,setBlogs]=useState([])

    useEffect(()  => {
        getAllBlogs()
    },[])
    
    async function getAllBlogs(){
        try {
            const res=await axios.get('/api/post/getallposts/')
            if(res){
                console.log("response for getting all posts",res)
                setBlogs(res.data.data)
            }
        } catch (error) {
            console.log("error in getting all blogs",error)
        }
    }

    const blogData = [
        {
            imageUrl: 'https://picsum.photos/200/300?random=1',
            title: 'How to Build a Blog with Next.js',
            description:
                'Learn how to build a blog using Next.js, React, and Tailwind CSS. This tutorial covers everything from setting up the project to deploying it to production.',
            likes: 120,
            comments: 45,
        },
        {
            imageUrl: 'https://picsum.photos/200/300?random=2',
            title: 'JavaScript Basics for Beginners',
            description:
                'A complete guide to understanding the fundamentals of JavaScript, perfect for beginners looking to dive into web development.',
            likes: 230,
            comments: 78,
        },
        {
            imageUrl: 'https://picsum.photos/200/300?random=3',
            title: 'Responsive Design with Tailwind CSS',
            description:
                'Learn how to create responsive, mobile-first websites using Tailwind CSS, making your designs beautiful and accessible.',
            likes: 85,
            comments: 22,
        },
        {
            imageUrl: 'https://picsum.photos/200/300?random=4',
            title: 'Building REST APIs with Django REST Framework',
            description:
                'This guide will teach you how to build and structure APIs using Django REST Framework, a powerful toolkit for creating RESTful APIs.',
            likes: 150,
            comments: 55,
        },
    ];
    return (
        <>
            <div className="flex justify-center items-center p-10">
                <h1 className='text-5xl underline font-mono text-white'>Explore User Blogs</h1>
            </div>
            <div className='flex justify-center items-center gap-5 flex-wrap p-5'>
                {
                    blogs&& blogs.map((card, index) =>
                        <BlogCard
                            key={index}
                            imageUrl={card.image}
                            title={card.title}
                            description={card.description}
                            likes={22}
                            comments={4}
                            userInfo={card.user}
                        />
                    )
                }
            </div>
            <CommentsPopup
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    )
}

export default LandingBlogSec
