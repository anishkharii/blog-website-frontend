


export const addBlog = async ({ id, token, formData }) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs?id=${id}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }; 
  
  export const showAllBlogs = async ({ page, filter, sort }) => {
    const limit = 12;
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/blogs?page=${page}&limit=${limit}&isPublished=${filter}&sort=${sort}`
    );
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  
  export const updateBlog = async ({ blogId, userId, token, formData }) => {
    console.log(formData)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${blogId}?id=${userId}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
       },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error(await res.text());
    return  res.json();
  };
  
  export const deleteBlogById = async ({ blogId, userId, token }) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${blogId}?id=${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  
  export const deleteBlogsByQuery = async ({ token, query }) => {
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/blogs`);
    Object.keys(query).forEach((key) => url.searchParams.append(key, query[key]));
  
    const res = await fetch(url.toString(), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  
  export const showBlogById = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  