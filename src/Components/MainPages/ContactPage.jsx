import React, { useState } from "react";
import Button from "../UI/Button";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
  };

  return (
    <div className="mx-auto flex h-full min-h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-primary via-light_accent to-primary  dark:from-[#1e1e1e] dark:to-[#1e1e1e] text-secondary px-5 py-10">
      <div className="relative z-50 w-full max-w-3xl rounded-lg border border-border bg-primary p-8 shadow-2xl shadow-shadow">
        <div className="text-left">
          <h2 className="pb-2 text-3xl font-bold text-accent">Contact Us</h2>
          <p className="text-sm text-muted">
            Have a question, feedback, or just want to say hello? Fill out the form below — I'd love to hear from you.
          </p>
          <p>*Currently under development (not functional)*</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 pt-8">
          <div className="flex flex-col text-left">
            <label className="mb-1 text-sm font-medium text-secondary">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full rounded-lg border border-border bg-transparent p-3 text-sm text-secondary placeholder-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="mb-1 text-sm font-medium text-secondary">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="w-full rounded-lg border border-border bg-transparent p-3 text-sm text-secondary placeholder-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="mb-1 text-sm font-medium text-secondary">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Inquiry about services"
              required
              className="w-full rounded-lg border border-border bg-transparent p-3 text-sm text-secondary placeholder-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="mb-1 text-sm font-medium text-secondary">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows={5}
              required
              className="w-full rounded-lg border border-border bg-transparent p-3 text-sm text-secondary placeholder-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <Button type="submit">Send Message</Button>
        </form>
      </div>

      <footer className="z-50 mt-8 text-center text-sm text-muted">
        &copy; {new Date().getFullYear()} TechTales. All rights reserved.
      </footer>
    </div>
  );
};

export default ContactPage;
