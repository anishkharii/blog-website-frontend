import React, { useEffect, useState } from 'react'
import Button from '../UI/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { useNotification } from '../../Contexts/NotificationContext'

// async function getUserName(id){
//   const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user-name/${id}`);
//   const data = await res.json();
//   if(!data.status) return "Unknown";
//   return data.name;
// }

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const {TriggerNotification} = useNotification();
  useEffect(()=>{
    async function fetchBlogs(){
      try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs`);
        const data = await res.json();
        console.log(data);
        if(!data.status) return;

        setBlogs(data.data);
      } catch(err){
        console.error("Failed to fetch blogs:", err);
      }
    }
    fetchBlogs();
  },[]);
  function deleteBlog(id){
    fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}?id=${localStorage.getItem("id")}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      TriggerNotification({
        type: data.status ? "success" : "error",
        message: data.msg,
        duration: 3000,
      });
      if(data.status) window.location.reload();
    })
    .catch(err => console.error("Failed to delete blog:", err));
  }
  

  const getDate = (date)=>{
    const newDate = new Date(date).toDateString()
    return newDate;
  }

  const getAuthorName = (id) =>{
    fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}/name`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return data.name
    })
    .catch(err => console.error("Failed to get author name:", err));
  }
  return (
    <div className='text-white flex flex-col items-center justify-center p-5 '>
      <Button variant='primary' className='mb-5' onClick={ ()=>navigate('/add-blog')}>Create Blog</Button>
      <h1 className='text-4xl font-bold mb-5'>Blogs</h1>
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
            <h6 className=' text-xs'>-{getAuthorName(blog.userId) || "Unknown"}<i></i></h6>
            </div>
            <h6 className='text-sm text-white/70'>{getDate(blog.publishedAt)}</h6>
            <p className='text-gray-200'>
              {blog.body.split(' ').slice(0, 30).join(' ')}...
              <button onClick={() => navigate(`/blog/${blog._id}`)} className='text-blue-500 underline ml-2'>Read more</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogsPage