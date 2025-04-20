import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { useGetBlogById } from "../../Hooks/useBlogActions";
import Loading from "../Loading";
import {getUserName} from '../../Services/userServices';
import Footer from '../MainPages/Footer'
const BlogPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBlogById(id);
  const blog = data || {};
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const prevTitle = document.title;
    async function fetchUserName() {
     let name = await getUserName(blog.userId);
     setUserName(name);
    }
    if (blog.title) {
      document.title = `${blog.title} - ${prevTitle}`;
      fetchUserName();
      console.log(userName)
    }
    return () => {
      document.title = prevTitle;
    };
  }, [blog]);


  const getDate = (date) => new Date(date).toDateString();

  if (isLoading) return <Loading />;

  return (
    <>
        
    <div className="min-h-screen bg-gradient-to-b from-primary to-bg_light px-4 py-12 font-sans text-secondary md:px-12 lg:px-40">
      <article className="mx-auto w-full max-w-4xl rounded-3xl border border-border bg-white/5 p-8 shadow-[0_4px_24px_var(--color-shadow)] backdrop-blur-xl transition-all duration-300 md:p-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="mb-4 bg-gradient-to-r from-dark_accent pb-2  to-accent bg-clip-text font-heading text-3xl font-extrabold leading-tight text-transparent md:text-5xl">
            {blog.title}
          </h1>

          <div className="flex flex-col items-start justify-between space-y-2 text-sm md:flex-row md:items-center md:space-y-0 md:text-base">
            <span className="italic text-muted">By {userName}</span>
            <span className="text-muted">{getDate(blog.createdAt)}</span>
          </div>

          <div className="mt-4">
            <span className="inline-block rounded-full bg-gradient-to-r from-dark_accent to-accent px-4 py-1 text-xs uppercase tracking-wide text-white shadow-sm">
              {blog.category}
            </span>
          </div>
        </header>

        {/* Markdown Content */}
        <section className="prose prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-headings:mb-4 prose-headings:text-accent prose-h2:text-2xl prose-h3:text-xl prose-p:leading-loose prose-p:text-secondary prose-p:mb-6 prose-strong:text-accent prose-a:text-accent hover:prose-a:underline prose-img:my-8 prose-img:rounded-2xl prose-img:shadow-xl prose-img:mx-auto prose-img:max-w-full prose-img:w-auto prose-img:max-h-[400px] prose-img:object-contain prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-4 prose-blockquote:text-muted prose-blockquote:italic prose-blockquote:bg-white/5 prose-blockquote:rounded-xl prose-blockquote:py-2 prose-li:marker:text-light_accent prose-li:mb-2 prose-code:bg-bg_light prose-code:text-accent prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-hr:border-border my-6 max-w-none text-secondary transition-all duration-300">
          <Markdown>{blog.body}</Markdown>
        </section>
      </article>
    </div>
    <Footer/>
    </>
  );
};

export default BlogPage;
