import React from "react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="mx-auto flex h-full min-h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-primary via-light_accent to-primary dark:from-[#1e1e1e] dark:to-[#1e1e1e] text-secondary px-5 py-10">
      <div className="w-full max-w-3xl rounded-lg border border-border bg-primary p-8 shadow-2xl shadow-shadow text-left">
        <h1 className="mb-4 text-4xl font-bold text-accent">About This Project</h1>

        <p className="mb-5 text-sm text-muted leading-relaxed">
          Welcome to <span className="font-semibold text-secondary">TechTales</span> — a modern, full-stack blog platform built to showcase my skills in web development.
          This project was created with a focus on performance, usability, and a clean, aesthetic interface.
        </p>

        <h2 className="mb-2 text-2xl font-semibold text-accent">🚀 Project Highlights</h2>
        <ul className="mb-5 list-disc pl-5 text-sm text-muted space-y-2">
          <li>Fully responsive, mobile-friendly design with modern UI.</li>
          <li>Role-based authentication system (User, Author, Admin).</li>
          <li>Secure login, signup, and blog management features.</li>
          <li>Markdown support for blog content formatting.</li>
          <li>Image uploads with Cloudinary integration.</li>
        </ul>

        <h2 className="mb-2 text-2xl font-semibold text-accent">🛠️ Technologies Used</h2>
        <div className="mb-5 text-sm text-muted">
          <p><strong>Frontend:</strong> React.js, React Router, Tailwind CSS, Lucide Icons, Redux Toolkit</p>
          <p><strong>Backend:</strong> Node.js, Express.js, MongoDB, Mongoose</p>
          <p><strong>Other:</strong> Cloudinary, React Query, Markdown Previewer, JWT Authentication</p>
        </div>

        <h2 className="mb-2 text-2xl font-semibold text-accent">🎯 Purpose & Learning</h2>
        <p className="mb-5 text-sm text-muted leading-relaxed">
          This project was built not only to enhance my technical skills, but to learn about clean UI/UX principles, secure authentication systems, and scalable full-stack development.
          It’s meant to be a complete portfolio-ready showcase of what I can deliver as a web developer.
        </p>

        <h2 className="mb-2 text-2xl font-semibold text-accent">🎉 Fun Fact</h2>
        <p className=" mb-5 text-sm text-muted leading-relaxed">
          This is my first full-stack project where I used Markdown formatting — and now I’m obsessed with it!
        </p>

        <h2 className="mb-2 text-2xl font-semibold text-accent">📞 Let’s Connect</h2>
        <p className="text-sm text-muted mb-4">
          If you’d like to collaborate, discuss this project, or have any feedback — head over to the <Link to="/contact" className="underline underline-offset-2 text-accent hover:text-secondary">Contact</Link> page!
        </p>

        

        <div className="flex gap-5">
          <a
            href="https://github.com/anishkharii"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-all"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/anishkhari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-all"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://instagram.com/anish_khari_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-all"
          >
            <Instagram size={24} />
          </a>
        </div>
      </div>

      <footer className="z-50 mt-8 text-center text-sm text-muted">
        &copy; {new Date().getFullYear()} TechTales — Built with ❤️ by Anish Khari.
      </footer>
    </div>
  );
};

export default AboutPage;
