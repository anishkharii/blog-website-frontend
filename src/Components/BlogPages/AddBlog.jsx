import React, { useRef, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useNotification } from "../../Contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import MarkdownEditor from "react-markdown-editor-lite";
import Markdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

const AddBlog = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const descRef = useRef(null);
  const { TriggerNotification } = useNotification();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subcategory: "",
    tags: "",
    description: "",
    body: "",
  });

  const [visibility, setVisibility] = useState("public");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = ({ text }) => {
    setFormData((prev) => ({ ...prev, body: text }));
  };

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  const handleNext = () => {
    if (step === 1 && formData.description.length < 100) {
      TriggerNotification({
        type: "error",
        message: "Description should be at least 100 letters.",
        duration: 3000,
      });
      descRef.current?.focus();
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendingData = {
      title: formData.title,
      category: formData.category,
      subcategory: formData.subcategory,
      tags: formData.tags,
      description: formData.description,
      body: formData.body,
      userId: localStorage.getItem("id"),
      isPublished: visibility === "public",
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs?id=${localStorage.getItem("id")}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(sendingData),
      });

      const data = await res.json();

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
  };

  return (
    <div className="text-secondary flex flex-col items-center justify-center">
      <div className="z-50 w-full max-w-2xl p-6 bg-primary rounded-lg border border-border">
        <h1 className="text-3xl font-bold text-center mb-2">Add Blog</h1>
        <p className="text-lg text-center mb-6">Step {step} of 3</p>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <Input type="text" name="title" label="Title*" value={formData.title} onChange={handleChange} required />
              <Input type="text" name="category" label="Category*" value={formData.category} onChange={handleChange} required />
              <Input type="text" name="subcategory" label="Subcategory" value={formData.subcategory} onChange={handleChange} />
              <Input type="text" name="tags" label="Tags" value={formData.tags} onChange={handleChange} />
              <div>
                <div className="flex justify-between px-1 mb-1 text-sm text-muted">
                  <span>Description must be at least 100 characters</span>
                  <span>{formData.description.length}/100</span>
                </div>
                <Input
                  type="text"
                  name="description"
                  label="Short Description*"
                  value={formData.description}
                  onChange={handleChange}
                  ref={descRef}
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted px-1">You can write markdown syntax below</p>
              <label className="px-1 text-sm">Blog Body*</label>
              <MarkdownEditor
                value={formData.body}
                style={{ height: "400px" }}
                onChange={handleEditorChange}
                renderHTML={(text) => <Markdown>{text}</Markdown>}
              />
              <div className="flex justify-between mt-4">
                <Button type="button" onClick={handlePrev}>
                  Previous
                </Button>
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Preview</h2>
              <div className="p-4 bg-background border border-border rounded-md">
                <h3 className="text-xl font-bold mb-1">{formData.title}</h3>
                <p className="text-muted mb-2">{formData.description}</p>
                <Markdown>{formData.body}</Markdown>
              </div>
              <div className="mt-4">
                <label htmlFor="visibility" className="block text-sm mb-1">
                  Visibility
                </label>
                <select
                  name="visibility"
                  className="py-2 px-2 rounded-md bg-[#060607] text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                  onChange={handleVisibilityChange}
                  value={visibility}
                >
                  <option value="public">Public</option>
                  <option value="private" >
                    Private
                  </option>
                </select>
              </div>
              <div className="flex justify-between mt-4">
                <Button type="button" onClick={handlePrev}>
                  Previous
                </Button>
                <Button type="submit">Submit Blog</Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
