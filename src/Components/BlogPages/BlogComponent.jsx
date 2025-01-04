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
      className="border rounded-lg shadow-md p-4 bg-[#060607] hover:shadow-lg transition w-full h-68 flex flex-col justify-between overflow-hidden"
    >
      <div>
        <h4 className="text-lg font-bold mb-2 line-clamp-2">{blog.title}</h4>
        <div className="flex flex-col ">
          <h5 className="text-gray-500 mb-2">{convertDate(blog.createdAt)}</h5>
          <div className="flex items-center  gap-2">
            <Eye className="text-gray-500" size={16} />

            <h5 className="text-gray-500 ">{blog.views}</h5>
          </div>
        </div>
        <p className="text-gray-200 text-md overflow-hidden line-clamp-5">
          {blog.body}
        </p>
      </div>
      <button
        className="text-blue-500 mt-2 underline self-start"
        onClick={() => navigate(`/blog/${blog._id}`)}
      >
        Read More
      </button>
    </div>
  );
};

export default BlogComponent;
