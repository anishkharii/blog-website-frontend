import React, { useState, useRef } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { useNotification } from "../../Contexts/NotificationContext";
import { useUpdateUser } from "../../Hooks/useUserActions";

const Profile = () => {
  const userDetails = useSelector((state) => state.auth.user);
  const { TriggerNotification } = useNotification();

  const [editedUser, setEditedUser] = useState({
    firstName: userDetails?.fname || "",
    lastName: userDetails?.lname || "",
    email: userDetails?.email || "",
    image: userDetails?.image || "",
  });

  const [isEdited, setIsEdited] = useState(false);
  const imageRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const { mutate: updateUserData, isPending: isLoading } = useUpdateUser();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
    setIsEdited(true);
  };

  const handleSaveChanges = async () => {
    if (!editedUser.firstName || !editedUser.lastName) {
      return TriggerNotification({
        type: "error",
        message: "First Name and Last Name cannot be empty.",
        duration: 4000,
      });
    }

    const formData = new FormData();
    formData.append("fname", editedUser.firstName);
    formData.append("lname", editedUser.lastName);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    updateUserData({
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token"),
      formData,
    });
  };

  return (
    <div className="bg-gradient-to-br from-primary to-bg_light flex flex-col items-center justify-center  max-w-[400px] mx-auto p-5 border-border border rounded-lg shadow-xl ">
      {isLoading && <Loading />}
      <h1 className="text-3xl font-bold mb-5">Profile</h1>

      <div className="relative flex items-center flex-col">
        {editedUser.image ? (
          <>
            <img
              src={editedUser.image}
              alt="User"
              className="w-24 h-24 rounded-full object-cover border-2 border-white hover:border-gray-400 cursor-pointer"
              onClick={() => imageRef.current?.click()}
            />
            <Button onClick={() => imageRef.current?.click()}>
              Change Image
            </Button>
          </>
        ) : (
          <Button onClick={() => imageRef.current?.click()}>
            Add Image
          </Button>
        )}
      </div>

      <input
        type="file"
        ref={imageRef}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setImageFile(file);
            setEditedUser((prev) => ({
              ...prev,
              image: URL.createObjectURL(file),
            }));
            setIsEdited(true);
          }
        }}
        style={{ display: "none" }}
      />

      <div className="w-80 space-y-4">
        <Input
          type="text"
          label="First Name"
          name="firstName"
          value={editedUser.firstName}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          label="Last Name"
          name="lastName"
          value={editedUser.lastName}
          onChange={handleInputChange}
        />
        <Input
          type="email"
          label="Email"
          name="email"
          value={editedUser.email}
          disabled
        />
      </div>

      {isEdited && (
        <Button onClick={handleSaveChanges} className='mt-5'>Save Changes</Button>
      )}
    </div>
  );
};

export default Profile;
