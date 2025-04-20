import React, { useRef, useState, useEffect } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useNotification } from "../../Contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import MarkdownEditor from "react-markdown-editor-lite";
import Markdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import { useAddBlog } from "../../Hooks/useBlogActions";
import { FileText, BookOpenText, Eye, Save, CheckCircle } from "lucide-react";

const stepDetails = [
  { id: 1, name: "Details", icon: FileText },
  { id: 2, name: "Content", icon: BookOpenText },
  { id: 3, name: "Preview", icon: Eye },
];

const AddBlog = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const descRef = useRef(null);
  const { TriggerNotification } = useNotification();
  const { mutate: addBlog } = useAddBlog();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subcategory: "",
    tags: "",
    description: "",
    body: "",
  });

  const [visibility, setVisibility] = useState("public");
  const [draftLoaded, setDraftLoaded] = useState(false);

  useEffect(() => {
    const savedDraft = localStorage.getItem("blogDraft");
    if (savedDraft) {
      const parsedDraft = JSON.parse(savedDraft);
      setFormData((prev) => ({ ...prev, ...parsedDraft.formData }));
      setDraftLoaded(true);
      setVisibility(parsedDraft.visibility);
      setStep(parsedDraft.step);
      TriggerNotification({
        type: "info",
        message: "Draft restored!",
        duration: 3000,
      });
    }
    setDraftLoaded(true);
  }, []);

  useEffect(() => {
    if (!draftLoaded) return;
    const draft = { formData, visibility, step };
    localStorage.setItem("blogDraft", JSON.stringify(draft));
  }, [formData, visibility, step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = ({ text }) => {
    setFormData((prev) => ({ ...prev, body: text }));
  };

  const handleVisibilityChange = (e) => setVisibility(e.target.value);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendingData = {
      title: formData.title,
      category: formData.category,
      subcategory: formData.subcategory,
      tags: formData.tags,
      body: formData.description + "\n\n" + formData.body,
      userId: localStorage.getItem("id"),
      isPublished: visibility === "public",
    };

    addBlog({
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token"),
      formData: sendingData,
    });

    localStorage.removeItem("blogDraft");
    TriggerNotification({
      type: "success",
      message: "Blog submitted successfully!",
      duration: 3000,
    });
    navigate(-1);
  };
  

  const goToStep = (stepNum) => {
    if(step===1 && formData.description.length < 100) {
      TriggerNotification({
        type: "error",
        message: "Description should be at least 100 letters.",
        duration: 3000,
      });
      descRef.current?.focus();
      return;
    }
    setStep(stepNum);
  }

  return (
    <div className="text-secondary flex flex-col items-center p-6 min-h-screen bg-background">
      <div className="w-full max-w-3xl p-8 bg-primary rounded-2xl shadow-lg border border-border">

        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {stepDetails.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => goToStep(id)}
              className={`flex flex-col items-center gap-2 transition-all ${
                step === id
                  ? "text-accent"
                  : step > id
                  ? "text-green-400"
                  : "text-muted"
              }`}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  step === id
                    ? "border-accent bg-accent/10"
                    : step > id
                    ? "border-green-400 bg-green-400/10"
                    : "border-border bg-primary"
                }`}
              >
                {step > id ? (
                  <CheckCircle size={24} />
                ) : (
                  <Icon size={24} />
                )}
              </div>
              <span className="text-xs font-medium">{name}</span>
            </button>
          ))}
        </div>

        <h1 className="text-3xl font-bold text-center mb-4">Add Blog</h1>
        <p className="text-center text-muted mb-6">Step {step} of 3</p>

        <form onSubmit={handleSubmit}>
        {step === 1 && (
  <div className="space-y-5">
    <Input type="text" name="title" label="Title*" value={formData.title} onChange={handleChange} required />
    <Input type="text" name="category" label="Category*" value={formData.category} onChange={handleChange} required />
    <Input type="text" name="subcategory" label="Subcategory" value={formData.subcategory} onChange={handleChange} />
    <Input type="text" name="tags" label="Tags" value={formData.tags} onChange={handleChange} />
    <div>
      <div className="flex justify-between mb-1 text-sm text-muted">
        <span>Description must be at least 100 characters</span>
        <span>{formData.description.length}/100</span>
      </div>
      <label htmlFor="description" className="block text-sm font-medium mb-1">
        Short Description*
      </label>
      <textarea
        name="description"
        id="description"
        value={formData.description}
        onChange={handleChange}
        ref={descRef}
        required
        rows="5"
        className="w-full px-3 py-2 bg-primary border border-border rounded-md text-secondary focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted"
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
            <div className="space-y-5">
              <label className="text-sm font-medium">Blog Body*</label>
              <MarkdownEditor
                value={formData.body}
                style={{ height: "400px" }}
                onChange={handleEditorChange}
                renderHTML={(text) => <Markdown>{text}</Markdown>}
              />
              <div className="flex justify-between">
                <Button type="button" variant="secondary" onClick={handlePrev}>
                  Previous
                </Button>
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold">Preview</h2>
              <div className="p-4 bg-background border border-border rounded-md">
                <h3 className="text-xl font-bold mb-1">{formData.title}</h3>
                <p className="text-muted mb-2">{formData.description}</p>
                <Markdown>{formData.body}</Markdown>
              </div>
              <div>
                <label htmlFor="visibility" className="block text-sm mb-1 font-medium">
                  Visibility
                </label>
                <select
                  name="visibility"
                  className="py-2 px-2 rounded-md bg-primary text-secondary border border-border focus:outline-none focus:ring-2 focus:ring-white/20"
                  onChange={handleVisibilityChange}
                  value={visibility}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div className="flex justify-between">
                <Button type="button" variant="secondary" onClick={handlePrev}>
                  Previous
                </Button>
                <Button type="submit">
                  <Save className="inline-block mr-2" size={16} /> Submit Blog
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
