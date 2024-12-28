import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import Background from "../LoginPage/Background";
import Button from "../UI/Button";
import { useNotification } from "../../Contexts/NotificationContext";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    body: "",
    tags: "",
    subcategory: "",
    isPublished: true
  });
  const { TriggerNotification } = useNotification();
  const id = useParams().id;
  useEffect(()=>{
    async function fetchData(){
        try{
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`)
            const data = await res.json();
            console.log(data);
            const {title, category, body, tags, subcategory, isPublished} = data.data;
            setFormData({
                title,
                category,
                body,
                tags,
                subcategory,
                isPublished
            });
        }catch(err){
            console.error(err);
        }
    }
    fetchData();
  },[])
  const handleVisibilityChange = (event) => {
    if(event.target.value === 'private') {
      formData.isPublished = false;
    }
    else{
        formData.isPublished = true;
    }
  };

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const sendingData = {
      ...formData,
      userId: localStorage.getItem("id")
    }
    console.log(sendingData)
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}?id=${localStorage.getItem("id")}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(sendingData),
      });
      const data = await res.json();
      console.log(data);
      if (data.status) {
        TriggerNotification({
          type: "success",
          message: "Blog updated successfully",
          duration: 3500,
        });
        navigate("/blogs");
      } else {
        TriggerNotification({
          type: "error",
          message: data.msg,
          duration: 3500,
        });
      }

    } catch (err) {
      console.error("Failed to add blog:", err);
    }
  }

  return (
    <div className="text-white flex flex-col items-center justify-center">
      <Background top={-200} left={-100} />
      <div className="flex flex-col z-50 items-center justify-center">
        <h1 className="text-3xl font-bold">Update Blog</h1>
        <p className="text-lg mb-5"> Update the details of your blog</p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-3 py-5 border border-white/20 bg-[#060607] rounded-md"
        >
          <Input
            type="text"
            name="title"
            label="Title*"
            placeholder="Your Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <Input
            type="text"
            name="category"
            label="Category*"
            value={formData.category}
            placeholder="e.g. Technology, Health, etc."
            onChange={handleChange}
            required
          />
        <div className="flex flex-col md:flex-row">
          <Input
            type="text"
            name="subcategory"
            label="Subcategory"
            value={formData.subcategory}
            className="md:w-[320px]"
            placeholder="e.g. Artificial Intelligence, Nutrition"
            onChange={handleChange}
          />
          <Input
            type="text"
            className="md:w-[320px]"
            name="tags"
            label="Tags"
            value={formData.tags}
            placeholder="e.g. AI, Wellness, Programming"
            onChange={handleChange}
          />
          </div>
          <div className="flex flex-col px-2 text-left ">
            <label htmlFor="body">Body*</label>
            <textarea
              className="py-1 px-2 rounded-md w-full bg-transparent border border-white/20"
              name="body"
              rows="6"
              value={formData.body}
              placeholder="Enter your blog content here"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col px-2 text-left w-[110px] mt-3">
            <label htmlFor="visibility">Visibility</label>
            <select
              name="visibility"
              value={formData.isPublished ? "public" : "private"}
              className="py-2 px-2 rounded-md bg-[#060607] text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
              onChange={handleVisibilityChange}
              required
            >
              <option value="public" >Public</option>
              <option value="private" >Private</option>
            </select>
          </div>

          <Button type="submit" className="mt-5">
            Update Blog
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
