import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML content

const BlogPage = () => {
    const [blog, setBlog] = useState({});
    const id = useParams().id;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`);
                const data = await response.json();
                setBlog(data.data);
                fetchAuthorName(data.data.userId);
                
            } catch (error) {
                console.error(error);
            }
        }
        async function fetchAuthorName(userId) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}/name`);
                const data = await response.json();
                setBlog(prevBlog => ({ ...prevBlog, author: data.name }));
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [id]);

    // Sanitize the blog body to prevent XSS attacks
    const sanitizedBody = blog.body ? DOMPurify.sanitize(blog.body) : '';
    function getDate(date){
        const newDate = new Date(date).toDateString()
        return newDate;
    }

    return (
        <div className='flex flex-col items-center justify-center text-white p-5 lg:p-[0_200px] '>
            <h1 className='text-3xl font-bold text-center'>{blog.title}</h1>
            <h1 className='text-2xl italic self-end'>-{blog.author}</h1>
            <h1 className='text-xl font-bold self-start underline cursor-pointer hover:text-white/80'>{blog.category}</h1>
            <h1 className='text-xl self-start'>{getDate(blog.createdAt) || new Date().toDateString()}</h1>
            <div 
                className='text-lg p-2 lg:px-10' 
                dangerouslySetInnerHTML={{ __html: sanitizedBody }} 
            />
        </div>
    );
};

export default BlogPage;
