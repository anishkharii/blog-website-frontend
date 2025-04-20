import React, { useEffect, useState } from "react";
import { useNotification } from "../../Contexts/NotificationContext";
import { Copy } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Loading from "../Loading";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B"];

// Stat Card Component
const StatCard = ({ title, value, color }) => (
  <div className={`p-5 rounded-lg shadow-lg bg-${color}-500 text-white flex-1 text-center transition transform hover:scale-105 hover:shadow-xl`}>
    <h3 className="text-lg font-medium">{title}</h3>
    <p className="text-4xl font-bold mt-2">{value}</p>
  </div>
);

// User Section Component with Load More and Search
const UserSection = ({ title, userList, handleDelete }) => {
  const { TriggerNotification } = useNotification();
  const [visibleCount, setVisibleCount] = useState(5);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">{title}</h2>
      <div className="divide-y divide-secondary">
        {userList.slice(0, visibleCount).map((user) => (
          <div key={user._id} className="flex items-center py-3 gap-4 hover:bg-muted/10 transition duration-300">
            <div className="flex items-center gap-3 w-48">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                {user.image ? (
                  <img
                    src={user.image}
                    alt="avatar"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => window.open(user.image, "_blank")}
                  />
                ) : (
                  <span className="text-lg font-bold">{user.fname.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <span>{user.fname} {user.lname}</span>
            </div>
            <div className="flex items-center gap-2 w-64 overflow-x-auto">
              <p>{user.email}</p>
              <Copy
                onClick={() => {
                  navigator.clipboard.writeText(user.email);
                  TriggerNotification({ type: "success", message: "Email copied to clipboard" });
                }}
                className="cursor-pointer w-4 h-4"
              />
            </div>
            <Button variant="destructive" onClick={() => handleDelete(user._id)}>
              Delete
            </Button>
          </div>
        ))}

        {visibleCount < userList.length && (
          <div className="text-center mt-4">
            <Button variant="outline" onClick={handleLoadMore}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { TriggerNotification } = useNotification();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users?id=${localStorage.getItem("id")}&isDeleted=false`,
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
        setUsers(users.filter((user) => user._id !== userId));
        TriggerNotification({
          type: "success",
          message: "User deleted successfully.",
          duration: 3000,
        });
      } else {
        alert("Failed to delete user.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Categorizing users by role
  const admins = users.filter((user) => user.role === "admin");
  const authors = users.filter((user) => user.role === "author");
  const regularUsers = users.filter((user) => user.role === "user");

  // Search filtering
  const filteredAdmins = admins.filter(
    (user) =>
      user.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredAuthors = authors.filter(
    (user) =>
      user.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredUsers = regularUsers.filter(
    (user) =>
      user.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pie chart data
  const chartData = [
    { name: "Admins", value: admins.length },
    { name: "Authors", value: authors.length },
    { name: "Users", value: regularUsers.length },
  ];

  return (
    <div className="flex flex-col gap-8 text-secondary bg-primary min-h-screen p-6">
      {isLoading && <Loading />}

      <div>
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted">Manage your platform effectively and track user distribution.</p>
      </div>

      {/* Stat Cards */}
      <div className="flex flex-wrap gap-4 mb-8">
        <StatCard title="Total Users" value={users.length} color="gray" />
        <StatCard title="Admins" value={admins.length} color="emerald" />
        <StatCard title="Authors" value={authors.length} color="blue" />
      </div>

      {/* Graph */}
      <div className="rounded-lg p-4 shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-4">User Distribution</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded bg-primary border border-border text-secondary w-full"
        />
      </div>

      {/* User Sections */}
      <div className="w-full p-4 rounded-lg">
        <UserSection title="Admins" userList={filteredAdmins} handleDelete={handleDelete} />
        <UserSection title="Authors" userList={filteredAuthors} handleDelete={handleDelete} />
        <UserSection title="Users" userList={filteredUsers} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default AdminDashboard;
