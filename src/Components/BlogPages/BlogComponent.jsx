import { ChevronRight, Eye } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const BlogComponent = ({ blog }) => {
  const navigate = useNavigate();

  const convertDate = (dateString) => {
    const date = new Date(dateString).toDateString();
    return date;
  };

  const estimateReadTime = (body) => {
    const words = body.split(" ").length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  return (
    <div
      key={blog.id}
      onClick={() => navigate(`/blog/${blog._id}`)}
      className="group mx-auto flex w-full max-w-[500px] cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary to-bg_light p-5 shadow-sm transition duration-300 hover:shadow-md"
    >
      {/* Category Badge */}
      <div className="mb-2 inline-block rounded px-2 py-0.5 text-xs font-medium text-muted bg-bg_light">
        {blog.category || "Uncategorized"}
      </div>

      <div>
        <h4 className="mb-2 line-clamp-2 font-heading text-xl font-semibold text-secondary group-hover:text-dark_accent transition-colors duration-200">
          {blog.title}
        </h4>

        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span>{convertDate(blog.createdAt)}</span>
          <span>•</span>
          <span>{estimateReadTime(blog.body)}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Eye size={14} />
            <span>{blog.views}</span>
          </div>
        </div>

        <p className="line-clamp-4 text-sm text-secondary group-hover:text-muted transition-colors duration-200">
          {blog.body}
        </p>
      </div>

      <button
  className="mt-4 flex items-center gap-2 self-start rounded-full border border-dark_accent px-4 py-1.5 text-sm font-medium text-dark_accent transition hover:bg-dark_accent hover:text-bg_light"
  onClick={(e) => {
    e.stopPropagation();
    navigate(`/blog/${blog._id}`);
  }}
>
  Read More
  <ChevronRight/>
</button>

    </div>
  );
};

export default BlogComponent;
