import React, { useState } from 'react'
import Background from '../LoginPage/Background'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { useNavigate, useParams } from 'react-router-dom'

const ForgotPassPassPage = ({onAuthOtp, onTriggerNotification}) => {
    const navigate = useNavigate();
    const [password, setPassword] =  useState('');
    const id = useParams().id;
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forgot-password/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });
    
            const data = await res.json();
            console.log(data);
            if(data.status){
              onTriggerNotification({
                type: "success",
                message: data.msg,
                duration: 5000,
              });
              navigate(`/login`);
            }
        }
        catch(err){
            onTriggerNotification({
                type: "error",
                message: "Something went wrong. Please try again.",
                duration: 5000,
            });
            console.log(err);
        }
        
    }
  return (
    <div className="text-white text-center  flex flex-col items-center justify-center h-[80vh] max-w-md mx-auto">
      <Background top={-100} left={-100} />
      <div className=" border border-white/20 bg-[#060607] rounded-lg p-10 flex flex-col z-50 ">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-lg mb-5">Enter New Password</p>
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button onClick={handleSubmit}>Verify</Button>
      </div>
    </div>
  )
}

export default ForgotPassPassPage;