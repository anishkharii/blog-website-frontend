import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const BlogPage = () => {
    const [blog, setBlog] = useState({});
    const id = useParams().id;
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch(  `${import.meta.env.VITE_BACKEND_URL}/blog/${id}`);
            const data = await response.json();
            console.log(data);
            setBlog(data.data);
          } catch (error) {
            console.error(error);
          }
        }

        fetchData();
      }, []);
  return (
    <div className=' flex flex-col items-center justify-center text-white p-5'>
        <h1 className='text-4xl font-bold text-center'>{blog.title}</h1>
        <h1 className='text-2xl  italic'>-Author</h1>
        <h1 className='text-2xl font-bold'>{blog.category}</h1>
        <h1 className='text-2xl '>{blog.publishedAt || new Date().toDateString()}</h1>
        <p className='text-lg p-24'>{blog.body}</p>

    </div>
  )
}

export default BlogPage