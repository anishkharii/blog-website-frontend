import { Eye } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const BlogComponent = ({ blog }) => {
  const navigate = useNavigate();

  const convertDate = (dateString) => {
    const date = new Date(dateString).toDateString();
    return date;
  };

  return (
    <div
      key={blog.id}
      onClick={() => navigate(`/blog/${blog._id}`)}
      className="mx-auto flex w-full max-w-[500px] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-primary p-5 shadow-md shadow-shadow hover:shadow-shadow  transition duration-300 hover:shadow-xl"
    >
      <div>
        <h4 className="mb-3 line-clamp-2 font-heading text-xl font-semibold text-secondary">
          {blog.title}
        </h4>

        <div className="mb-3 flex flex-col text-sm text-muted">
          <h5 className="mb-1">{convertDate(blog.createdAt)}</h5>
          <div className="flex items-center gap-2">
            <Eye size={16} />
            <span>{blog.views}</span>
          </div>
        </div>

        <p className="line-clamp-5 text-base text-secondary">{blog.body}</p>
      </div>

      <button
        className="mt-3 self-start font-medium text-dark_accent underline transition hover:text-blue-400"
        onClick={() => navigate(`/blog/${blog._id}`)}
      >
        Read More
      </button>
    </div>
  );
};

export default BlogComponent;
