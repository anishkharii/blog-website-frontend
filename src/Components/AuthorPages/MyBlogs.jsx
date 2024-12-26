import { Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyBlogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const {userDetails} = useAuth();
    useEffect(() => {
        async function fetchBlogs() {
          try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs?userId=${localStorage.getItem("id")}`);
            const data = await res.json();
            if(data.status) setBlogs(data.data);
            else setBlogs([]);
          } catch (err) {
            console.error("Error fetching blogs:", err);
          }
        }
        fetchBlogs();
      }, []);

      const getDate = (date) => {
        const newDate = new Date(date).toDateString()
        return newDate;
      }
  return (
    <div className='text-white flex flex-col items-center justify-center '>
      <h1 className='text-4xl font-bold text-center'>My Blogs</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        
        {blogs.map((blog, i) => (
          <div key={i} className='bg-white relative bg-opacity-10 p-6 rounded-md'>
            <div className=' absolute top-2 right-2 flex gap-5 '>
            <span onClick={() => deleteBlog(blog._id)} ><Trash2 className='w-5 cursor-pointer hover:text-red-500 transition-all'/></span>
            <a href={`/update-blog/${blog._id}`}><Pencil className=' w-5 hover:text-blue-500 transition-all'/></a>
            </div>
            <h2 className='text-xl font-bold'>{blog.title}</h2>
            <div className='flex items-center justify-between'>
            <h6 className=' text-sm'><a href={`/category/${blog.category}`} className=' underline under'>{blog.category}</a></h6>
            <h6 className=' text-xs'>-<i>{userDetails.name}</i></h6>
            </div>
            <h6 className='text-sm text-white/70'>{getDate(blog.publishedAt)}</h6>
            <p className='text-gray-200 break-words'>
              {blog.body.split(' ').slice(0, 30).join(' ')}...
              <button onClick={() => navigate(`/blog/${blog._id}`)} className='text-blue-500 underline ml-2'>Read more</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBlogs