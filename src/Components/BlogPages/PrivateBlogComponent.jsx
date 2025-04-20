import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  BookOpenCheck,
  Eye,
  FileLock,
  Pencil,
  Trash2,
} from "lucide-react";
import { useDeleteBlogById } from "../../Hooks/useBlogActions";

const PrivateBlogComponent = ({ blog }) => {
  const { mutate: deleteBlogById } = useDeleteBlogById();

  const getDate = (date) => new Date(date).toLocaleDateString();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlogById({
        blogId: blog._id,
        userId: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
      });
    }
  };

  return (
    <div className="relative flex max-w-7xl flex-col gap-4 rounded-xl border border-border bg-gradient-to-br from-primary to-bg_light p-4 text-secondary shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          {/* Status Badge */}
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              blog.isPublished
                ? "bg-green-600 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {blog.isPublished ? "Public" : "Private"}
          </span>

          <h2 className="text-lg font-bold text-secondary md:text-2xl">
            {blog.title}
          </h2>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted">
          <Eye size={18} />
          <span>{blog.views}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted">
            Published: {getDate(blog.publishedAt)}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="rounded-full bg-dark_accent px-2 py-1 text-xs font-medium text-bg_light">
              {blog.category || "Uncategorized"}
            </span>
            <span>•</span>
            <span>{blog.readTime || "5 min read"}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          {/* View */}
          <Link to={`/blog/${blog._id}`} className="group relative">
            <BookOpen className="w-5 text-secondary transition-all hover:text-accent" />
            <div className="pointer-events-none absolute bottom-full z-50 mb-2 w-max rounded bg-dark_accent px-3 py-1 text-xs text-bg_light opacity-0 shadow transition-opacity delay-300 duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
              View
            </div>
          </Link>

          {/* Edit */}
          <Link to={`/update-blog/${blog._id}`} className="group relative">
            <Pencil className="w-5 text-secondary transition-all hover:text-accent" />
            <div className="pointer-events-none absolute bottom-full z-50 mb-2 w-max rounded bg-dark_accent px-3 py-1 text-xs text-bg_light opacity-0 shadow transition-opacity delay-300 duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
              Edit
            </div>
          </Link>

          {/* Delete */}
          <span
            onClick={handleDelete}
            className="group relative cursor-pointer"
          >
            <Trash2 className="w-5 text-secondary transition-all hover:text-red-500" />
            <div className="pointer-events-none absolute bottom-full z-50 mb-2 w-max rounded bg-dark_accent px-3 py-1 text-xs text-bg_light opacity-0 shadow transition-opacity delay-300 duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
              Delete
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PrivateBlogComponent;
