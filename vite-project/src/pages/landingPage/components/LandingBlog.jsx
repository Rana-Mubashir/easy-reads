import React from 'react'
import BlogCard from '../../../components/BlogCard';
import { useState, useEffect } from 'react';
import CommentsPopup from '../../../components/CommentsPopup'
import axios from 'axios';
import { toast } from 'react-toastify';


function LandingBlogSec() {
    const [isOpen, setIsOpen] = useState(false)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        getAllBlogs()
    }, [])

    async function getAllBlogs() {
        try {
            const res = await axios.get('/api/post/getallposts/')
            if (res) {
                console.log("response for getting all posts", res)
                setBlogs(res.data.data)
            }
        } catch (error) {
            console.log("error in getting all blogs", error)
        }
    }

    async function deleteBlog(id) {
        const confirm = window.confirm("Do you really want to delete this blog?")
        if (confirm) {
            try {
                console.log("id", id)
                const res = await axios.delete(`/api/post/deletepost/${id}/`)
                if (res) {
                    console.log("response for deleting the post", res)
                    toast.success("Blog deleted sucessfully!")
                    getAllBlogs()
                }

            } catch (error) {
                console.log("error in deleting blog", error)
                toast.error("Something went wrong while deleting the blog!")
            }
        }
    }

    return (
        <>
            <div className="flex justify-center items-center p-10">
                <h1 className='text-5xl underline font-mono text-white'>Explore User Blogs</h1>
            </div>
            <div className='flex justify-center items-center gap-5 flex-wrap p-5'>
                {
                    blogs && blogs.map((card, index) =>
                        <BlogCard
                            key={index}
                            imageUrl={card.image}
                            title={card.title}
                            description={card.description}
                            likes={22}
                            comments={4}
                            userInfo={card.user}
                            deleteBlog={deleteBlog}
                            postId={card.id}
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
