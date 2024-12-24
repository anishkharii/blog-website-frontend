import React, { useEffect, useState } from 'react'
import Background from '../LoginPage/Background'
import Input from '../UI/Input'
import Footer from '../MainPages/Footer';
import { useAuth } from '../../Hooks/useAuth';

const UserPage = () => {
  const { userDetails } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    
    
      const fetchBlogs = async () => {
        // Replace with API call
        const mockBlogs = [
          {
            id: 1,
            title: "Understanding React Hooks",
            description: "An introduction to React hooks and how to use them effectively.",
            author: "Jane Smith",
          },
          {
            id: 2,
            title: "Mastering JavaScript Closures",
            description: "A deep dive into closures and their applications.",
            author: "John Doe",
          },
          {
            id: 3,
            title: "CSS Grid vs Flexbox",
            description: "When to use CSS Grid and Flexbox in your layouts.",
            author: "Alice Johnson",
          },
        ];
        setBlogs(mockBlogs);
      };

      fetchBlogs();
    
  }, []);



  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="flex flex-col min-h-screen text-white">
      

      {/* Welcome Section */}
        <Background top={-200} left={-200} />
      <section className=" py-8 px-6 text-center z-50">
        <h2 className="text-3xl font-bold mb-4 z-50">Welcome, {userDetails.name}!</h2>
        <p className="text-lg z-50">Explore the latest blogs and updates curated just for you.</p>
      </section>

      {/* Search and Blog Section */}
      <main className="container mx-auto flex-grow py-8 px-4 z-50">
        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search blogs..."
            className='w-96'
          />
        </div>

        {/* Blog Listings */}
        <section>
          <h3 className="text-2xl font-semibold mb-4">Recent Blogs</h3>
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="border rounded-lg shadow-md p-4 bg-[#060607] hover:shadow-lg transition"
                >
                  <h4 className="text-lg font-bold mb-2">{blog.title}</h4>
                  <p className="text-gray-600 mb-2">{blog.description}</p>
                  <p className="text-sm text-gray-500">By {blog.author}</p>
                  <button className="text-blue-500 mt-2 underline">Read More</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No blogs found matching your search.</p>
          )}
        </section>
      </main>

      {/* Sidebar Section */}
      <aside className="bg-[#09090b] py-8 px-6 border-t border-white/20">
        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><a href="/create-blog" className="text-blue-500 hover:underline">Create New Blog</a></li>
          <li><a href="/profile" className="text-blue-500 hover:underline">My Profile</a></li>
          <li><a href="/categories" className="text-blue-500 hover:underline">Browse Categories</a></li>
          <li><a href="/about" className="text-blue-500 hover:underline">About Us</a></li>
        </ul>
      </aside>

      {/* Footer Section */}
      <Footer/>
    </div>
  )
}

export default UserPage