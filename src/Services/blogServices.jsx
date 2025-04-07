


export const addBlog = async ({ token, formData }) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }; 
  
  export const showAllBlogs = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  
  export const updateBlog = async ({ blogId, userId, token, formData }) => {
    console.log(formData)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${blogId}?id=${userId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    console.log(data)
    if (!res.ok) throw new Error(await res.text());
    return data;
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
  
  export const showBlog = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  