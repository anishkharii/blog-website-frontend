
export const addUser = async (userData) => {
  console.log(userData)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  
  export const verifyUser = async ({id, otp, type}) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/verify/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp, type }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  
  export const loginUser = async ({ email, password }) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  
  export const getAllUsers = async (token) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  
  export const forgotPasswordStep1 = async (email) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/forgot-password/${email}`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  
  export const forgotPasswordStep2 = async (id, newPassword) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/forgot-password/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: newPassword }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  
  export const wakeUp = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/wakeUp`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  
  export const getUser = async ({ id, token }) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  };
  
  export const updateUser = async ({ id, token, formData }) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  
  export const deleteUser = async ({ id, token }) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  
  export const getUserName = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}/name`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };
  
  