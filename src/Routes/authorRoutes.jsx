import { Route } from "react-router-dom";
import MyBlogs from "../Components/AuthorPages/MyBlogs";

const authorRoutes = (
    <>
        <Route path='/my-blogs' element={<MyBlogs />} />
    </>
)

export default authorRoutes;