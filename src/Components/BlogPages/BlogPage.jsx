import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify'; 
import { useNotification } from '../../Contexts/NotificationContext';

const BlogPage = () => {
    const navigate = useNavigate();
    const [blog, setBlog] = useState({});
    const {TriggerNotification} = useNotification();
    const id = useParams().id;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`);
                const data = await response.json();
                if(!data.status) {
                    TriggerNotification({
                        type: "error",
                        message: data.msg,
                        duration: 3000
                    });
                    navigate("/blogs");
                    return;
                }
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
                if(!data.status) {
                    setBlog(prevBlog => ({ ...prevBlog, author: "Unknown" }));
                    return;
                }
                setBlog(prevBlog => ({ ...prevBlog, author: data.name }));
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [id]);

    useEffect(()=>{
        const title = document.title;
        if(blog.title) {
            document.title = `${blog.title} - ${title}`;
        }

        return ()=>{
            document.title = title;
        }
    },[blog.title]);

    const sanitizedBody = blog.body ? DOMPurify.sanitize(blog.body) : '';
    function getDate(date){
        const newDate = new Date(date).toDateString()
        return newDate;
    }

    return (
        <div className='flex flex-col items-center justify-center text-white p-5 lg:p-[0_200px] '>
            <h1 className='text-xl md:text-3xl font-bold text-center'>{blog.title}</h1>
            <h1 className='text-sm md:text-xl italic self-end'>-{blog.author}</h1>
            <h1 className='text-sm md:text-xl font-bold self-start underline cursor-pointer hover:text-white/80'>{blog.category}</h1>
            <h1 className='text-sm md:text-xl text-white/50 self-start'>{getDate(blog.createdAt) || new Date().toDateString()}</h1>
            <div 
                className='text-lg p-1 lg:px-10' 
                dangerouslySetInnerHTML={{ __html: sanitizedBody }} 
            />
        </div>
    );
};

export default BlogPage;
