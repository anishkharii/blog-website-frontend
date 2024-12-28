import React, { useEffect, useState } from "react";
import Loading from "../Loading";

const UserSection = ({ title, userList, handleDelete }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">{title}</h2>
    <table className="w-full text-left">
      <thead>
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((user) => (
          <tr key={user.id} className="border-b border-gray-700">
            <td className="px-4 py-2">{user.fname + " " + user.lname}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users?id=${localStorage.getItem(
            "id"
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setUsers(data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.ok) {
        setUsers(users.filter((user) => user.id !== userId));
        alert("User deleted successfully.");
      } else {
        alert("Failed to delete user.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const admins = users.filter((user) => user.role === "admin");
  const authors = users.filter((user) => user.role === "author");
  const regularUsers = users.filter((user) => user.role === "user");

  return (
    <div className="flex flex-col items-center text-white bg-black min-h-screen py-10 px-5">
      {isLoading && <Loading />}
      <h1 className="text-4xl font-bold mb-6">Admin Page</h1>
      <p className="text-lg mb-10">Manage users effectively with this dashboard.</p>

      <div className="w-full max-w-5xl bg-[#222] p-6 rounded-md shadow-md">
        <UserSection title="Admins" userList={admins} handleDelete={handleDelete} />
        <UserSection title="Authors" userList={authors} handleDelete={handleDelete} />
        <UserSection title="Users" userList={regularUsers} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default AdminPage;
