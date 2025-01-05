import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../Contexts/NotificationContext";
import Button from "../UI/Button";
const UserSection = ({ title, userList, handleDelete }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">{title}</h2>
    <div className="w-full text-left">
      
        <div className="grid grid-cols-5 ">
          <span className="px-4 py-2 col-span-1">Name</span>
          <span className="px-20 py-2 col-span-3">Email</span>
          <span className="px-4 py-2 col-span-1">Actions</span>
        </div>
        {userList.map((user) => (
          <div key={user.id} className="border-b border-gray-700 w-full grid items-center justify-center grid-cols-5">
            <span className="px-4 py-2 col-span-1">{user.fname + " " + user.lname}</span>
            <p className="px-4 py-2 col-span-3 line-clamp-2">{user.email}</p>
              <Button
                variant='destructive'
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </Button>
          </div>
        ))}
    </div>
  </div>
);

const AdminPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {isAuthenticated} = useAuth();
  const {TriggerNotification} = useNotification();

  useEffect(() => {
    if(!isAuthenticated){
      navigate("/");
      return;
    }
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users?id=${localStorage.getItem(
            "id"
          )}&isDeleted=false`,
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
  }, [isAuthenticated]);
  

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}?id=${localStorage.getItem("id")}`,
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
        TriggerNotification({
          type: "success",
          message: "User deleted successfully.",
          duration: 3000,
        })
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

      <div className="w-full max-w-5xl bg-[#222] p-2 rounded-md shadow-md">
        <UserSection title="Admins" userList={admins} handleDelete={handleDelete} />
        <UserSection title="Authors" userList={authors} handleDelete={handleDelete} />
        <UserSection title="Users" userList={regularUsers} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default AdminPage;
