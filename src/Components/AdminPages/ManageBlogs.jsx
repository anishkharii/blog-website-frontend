import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useNotification } from "../../Contexts/NotificationContext";
import PrivateBlogList from "../BlogPages/PrivateBlogList";
import { useQuery } from "@tanstack/react-query";
import { useShowAllBlogs } from "../../Hooks/useBlogActions";


const ManageBlogs = () => {

  return (
    <div className="text-white  flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold mb-5">Manage Blogs</h1>
      <PrivateBlogList />
    </div>
  );
};

export default ManageBlogs;
