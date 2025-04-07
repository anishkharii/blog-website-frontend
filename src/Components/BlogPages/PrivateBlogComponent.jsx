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
import { useDeleteBlogById } from "../../Hooks/useBlogActions";

const PrivateBlogComponent = ({ blog }) => {
  const { mutate: deleteBlogById } = useDeleteBlogById();

  const getDate = (date) => new Date(date).toDateString();

  const deleteBlog = (id) => {
    const confirmation = window.confirm("Are you sure you want to delete?");
    if (!confirmation) return;
    deleteBlogById({
      blogId: id,
      userId: localStorage.getItem("id"),
      token: localStorage.getItem("token"),
    });
  };

  return (
    <div className="bg-primary text-secondary relative grid grid-cols-[5fr_1fr] hover:bg-bg_light transition-all px-2 md:px-5 py-2 rounded-md border border-border shadow-shadow">
      <div className="flex items-center gap-2">
        {/* Status Icon with Tooltip */}
        <div className="relative group">
          {blog.isPublished ? (
            <BookOpenCheck size={15} className="text-accent" />
          ) : (
            <FileLock size={15} className="text-secondary" />
          )}
          <div className="absolute bottom-full mb-2 w-max px-3 py-2 text-sm text-bg_light bg-dark_accent rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 delay-[500ms]">
            {blog.isPublished ? "Public Blog" : "Private Blog"}
          </div>
        </div>

        <div>
          <h2 className="text-sm md:text-lg font-bold line-clamp-3 md:line-clamp-2">
            {blog.title}
          </h2>
          <h6 className="text-xs text-muted">{getDate(blog.publishedAt)}</h6>
        </div>
      </div>

      <div className="flex flex-col gap-2 justify-between">
        <div className="flex gap-2 md:gap-5 justify-end">
          {/* View */}
          <Link to={`/blog/${blog._id}`} className="group relative">
            <BookOpen className="w-5 text-secondary hover:text-accent transition-all" />
            <div className="absolute bottom-full mb-2 w-max px-3 py-2 text-sm text-bg_light bg-dark_accent rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 delay-[500ms]">
              View Blog
            </div>
          </Link>

          {/* Edit */}
          <Link to={`/update-blog/${blog._id}`} className="group relative">
            <Pencil className="w-5 text-secondary hover:text-accent transition-all" />
            <div className="absolute bottom-full mb-2 w-max px-3 py-2 text-sm text-bg_light bg-dark_accent rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 delay-[500ms]">
              Edit Blog
            </div>
          </Link>

          {/* Delete */}
          <span onClick={() => deleteBlog(blog._id)} className="group relative">
            <Trash2 className="w-5 cursor-pointer text-secondary hover:text-red-500 transition-all" />
            <div className="absolute bottom-full mb-2 w-max px-3 py-2 text-sm text-bg_light bg-dark_accent rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 delay-[500ms]">
              Delete Blog
            </div>
          </span>
        </div>

        <div className="flex items-center gap-2 justify-end text-sm">
          <Eye size={18} className="text-secondary" />
          <h5>{blog.views}</h5>
        </div>
      </div>
    </div>
  );
};

export default PrivateBlogComponent;
