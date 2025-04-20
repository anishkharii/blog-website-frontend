import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useNotification } from "../../Contexts/NotificationContext";
import PrivateBlogList from "../BlogPages/PrivateBlogList";
import { useQuery } from "@tanstack/react-query";
import { useShowAllBlogs } from "../../Hooks/useBlogActions";


const ManageBlogs = () => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("new");
  const [totalBlogs, setTotalBlogs] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;

  const {data} = useShowAllBlogs();
  console.log(data)
  const blogs = data?.data || [];
  

  return (
    <div className="text-white  flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold mb-5">Manage Blogs</h1>
      <PrivateBlogList blogs={blogs} onFilter={setFilter} onSort={setSort} totalBlogs={totalBlogs} page={page} />
    </div>
  );
};

export default ManageBlogs;
