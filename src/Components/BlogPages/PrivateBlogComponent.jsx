import {
  BookOpen,
  BookOpenCheck,
  Eye,
  FileLock,
  Pencil,
  Trash2,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useNotification } from "../../Contexts/NotificationContext";

const PrivateBlogComponent = ({ blog }) => {
  const { TriggerNotification } = useNotification();
  const getDate = (date) => {
    const newDate = new Date(date).toDateString();
    return newDate;
  };
  function deleteBlog(id) {
    const confirmation = window.confirm("Are you sure you want to delete?");
    if (!confirmation) return;
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/blogs/${id}?id=${localStorage.getItem("id")}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        TriggerNotification({
          type: data.status ? "success" : "error",
          message: data.msg,
          duration: 3000,
        });
        if (data.status) window.location.reload();
      })
      .catch((err) => console.error("Failed to delete blog:", err));
  }
  return (
    <div className="bg-white relative grid grid-cols-[5fr_1fr] bg-opacity-10 hover:bg-opacity-15 transition-all px-2 md:px-5 py-2 rounded-md">
      <div className="  flex items-center gap-2">
        <div className="relative group  text-white/70">
          {blog.isPublished ? (
            <BookOpenCheck size={15} className="text-green-500" />
          ) : (
            <FileLock size={15} className="text-red-500 tooltip " />
          )}
          <div class="absolute bottom-full mb-2 w-max px-3 py-2 text-sm text-white bg-gray-800 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 delay-[500ms]">
            {
                blog.isPublished ? "Public Blog" : "Private Blog"
            }
          </div>
        </div>
        <div>
          <h2 className="text-sm md:text-lg font-bold line-clamp-3 md:line-clamp-2">
            {blog.title}
          </h2>
          <h6 className="text-xs text-white/70">{getDate(blog.publishedAt)}</h6>
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-between">
        <div className="flex gap-2 md:gap-5 justify-end  ">
          <Link to={`/blog/${blog._id}`} className="group relative">
            <BookOpen className=" w-5 hover:text-blue-500 transition-all" />
            <div class="absolute bottom-full mb-2 w-max px-3 py-2 text-sm text-white bg-gray-800 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 delay-[500ms]">
            View Blog
          </div>
          </Link>
          <Link to={`/update-blog/${blog._id}`} className="group relative">
            <Pencil className=" w-5 hover:text-yellow-500 transition-all" />
            <div class="absolute bottom-full mb-2 w-max px-3 py-2 text-sm text-white bg-gray-800 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 delay-[500ms]">
            Edit Blog
            </div>
          </Link>
          <span onClick={() => deleteBlog(blog._id)} className="group relative">
            <Trash2 className="w-5 cursor-pointer hover:text-red-500 transition-all" />
            <div class="absolute bottom-full mb-2 w-max px-3 py-2 text-sm text-white bg-gray-800 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 delay-[500ms]">
            Delete Blog
            </div>
          </span>
          
        </div>

        <div className="flex items-center  gap-2 justify-end text-sm ">
          <Eye size={18} />
          <h5>{blog.views}</h5>
        </div>
      </div>
    </div>
  );
};

export default PrivateBlogComponent;
