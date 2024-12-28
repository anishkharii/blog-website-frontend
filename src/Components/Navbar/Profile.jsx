import React, { useState, useEffect, useRef } from "react";
import Input from "../UI/Input";
import { useAuth } from "../../Contexts/AuthContext";
import Button from "../UI/Button";
import { useNotification } from "../../Contexts/NotificationContext";
import Loading from "../Loading";

const Profile = () => {
  const { userDetails, loading } = useAuth();
  const {TriggerNotification} = useNotification();
  if (loading) {
    return <div>Loading...</div>;
  }

  const [editedUser, setEditedUser] = useState({
    firstName: userDetails.fname,
    lastName: userDetails.lname,
    email: userDetails.email,
    image: userDetails.image,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isImageField, setIsImageField] = useState(false);
  const imageRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (isImageField && imageRef.current) {
      imageRef.current.click();
    }
  }, [isImageField]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
    setIsEdited(true);
  };

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("fname", editedUser.firstName);
      formData.append("lname", editedUser.lastName);

      if (imageFile) {
        formData.append("image", imageFile); // Attach the image file
      }

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${localStorage.getItem(
          "id"
        )}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData, // Send FormData instead of JSON
        }
      );

      const data = await res.json();
      console.log(data)
      if (data.status) {
        TriggerNotification({
          type: "success",
          message: data.msg,
          duration: 5000,
        });
        setIsImageField(false);
        setIsEdited(false);
        setEditedUser({
          firstName: data.data.fname,
          lastName: data.data.lname,
          image: data.data.image,
        });
        
      }

      if (!data.status) {
        TriggerNotification({
          type: "error",
          message: data.msg,
          duration: 5000,
        });
      }
    } catch (err) {
      TriggerNotification({
        type: "error",
        message: err.message,
        duration: 5000,
      })
      console.error(err);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-white space-y-4">
    {isLoading && <Loading/>}
      <h1 className="text-3xl font-bold">Profile</h1>
      {editedUser.image && (
        <div className="relative flex items-center flex-col">
          <img
            src={editedUser.image}
            alt="User"
            className="w-24 h-24 rounded-full object-cover border-2 border-white hover:border-[#3c3c3f] cursor-pointer"
          />
          <Button
            onClick={() => {
              setIsImageField(true);
            }}
          >
            Change Image
          </Button>
        </div>
      )}
      <div className="w-80 space-y-4">
        {isImageField && (
          <input
            type="file"
            name="avatar"
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
              }
              setIsEdited(true);
              setIsImageField(false);
            }}
            style={{ display: "none" }}
          />
        )}
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
          onChange={handleInputChange}
        />
      </div>
      {isEdited && <Button onClick={handleSaveChanges}>Save Changes</Button>}
    </div>
  );
};

export default Profile;
