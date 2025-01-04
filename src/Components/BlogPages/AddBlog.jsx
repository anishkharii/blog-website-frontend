import React, { useRef, useState } from "react";
import Input from "../UI/Input";
import Background from "../LoginPage/Background";
import Button from "../UI/Button";
import { useNotification } from "../../Contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    body: "",
    description: "",
    tags: "",
    subcategory: ""
  });
  const [visibility, setVisibility] = useState("public");
  const descRef = useRef(null);
  const { TriggerNotification } = useNotification();

  const handleVisibilityChange = (event) => {
    if(event.target.value === 'private') {
      setVisibility('private');
    }
    else{
        setVisibility('public');
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
      title: formData.title,
      category: formData.category,
      body: formData.description+formData.body,
      tags: formData.tags,
      subcategory: formData.subcategory,
      userId: localStorage.getItem("id"),
      isPublished: visibility === "public" ? true : false,
    }
    console.log(sendingData)
    if(formData.description.length < 100) {
      TriggerNotification({
        type: "error",
        message: "Description should be at least 100 letters.",
        duration: 3000,
      });
      descRef.current.focus();
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs?id=${localStorage.getItem("id")}`, {
        method: "POST",
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
          message: "Blog added successfully",
          duration: 3000,
        });
        navigate("/blogs");
      } else {
        TriggerNotification({
          type: "error",
          message: data.msg,
          duration: 3000,
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
        <h1 className="text-3xl font-bold">Add Blog</h1>
        <p className="text-lg mb-5">Enter details below to add your blog.</p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-3 py-5 border border-white/20 bg-[#060607] rounded-md w-[120%] md:w-auto"
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
          <div className="flex justify-between px-2 mt-3">
              <p className="text-sm text-white/80">
                Description must be greater than 100 letters
              </p>
              <p className="text-sm text-white/80">
                 {formData.description.length}/100
              </p>
            </div>
          <Input 
            type="text"
            name="description"
            label="Description*"
            value={formData.description}
            placeholder="Enter a short description of your blog"
            onChange={handleChange}
            ref={descRef}
            required
          />
          <div className="flex flex-col px-2 text-left ">
            <p className="text-sm text-white/80 mt-5">Can write HTML tags</p>
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
              className="py-2 px-2 rounded-md bg-[#060607] text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
              onChange={handleVisibilityChange}
              required
            >
              <option value="public"  >Public</option>
              <option value="private" disabled>Private</option>
            </select>
          </div>

          <Button type="submit" className="mt-5">
            Add Blog
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
