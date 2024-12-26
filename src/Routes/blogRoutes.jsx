import { Route } from "react-router-dom"
import AddBlog from "../Components/BlogPages/AddBlog"
import { BlogsPage } from "../Components/AllComponents"
import BlogPage from "../Components/BlogPages/BlogPage";
import UpdateBlog from "../Components/BlogPages/UpdateBlog";


const blogRoutes = (

        <>
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blog/:id" element={<BlogPage />} />
            <Route path="/add-blog" element={<AddBlog />} />
            <Route path="/update-blog/:id" element={<UpdateBlog />} />
        </>
)

export default blogRoutes;