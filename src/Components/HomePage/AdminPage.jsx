import React, { useEffect, useState } from "react";

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${localStorage.getItem("id")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      const data = await res.json();
      console.log(data.users);
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold">Admin Page</h1>
      <p className="text-lg mb-5">This is the admin page.</p>
      <div className="bg-[#333] p-4 rounded-md">
        <h2 className="text-xl font-semibold">List of all the Users</h2>
        {
            users.map((user, i) => (
                <div key={i} className="flex justify-between items-center gap-3 my-2 p-2 bg-[#444] rounded-md">
                <p>{user.fname}</p>
                <p>{user.lname}</p>
                <p>{user.email}</p>
                </div>
            ))
        }
      </div>
    </div>
  );
};

export default AdminPage;
