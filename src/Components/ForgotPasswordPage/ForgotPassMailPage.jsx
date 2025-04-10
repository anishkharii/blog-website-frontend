import React, { useState } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '../../Contexts/NotificationContext'
import { useAuth } from '../../Contexts/AuthContext'
import Loading from '../Loading'

const ForgotPassMailPage = () => {
    const navigate = useNavigate();
    const {TriggerNotification} = useNotification();
    const [email, setEmail] =  useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {setAuthOtp} = useAuth();
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{

          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/forgot-password/${email}`);
          const data = await res.json();
          console.log(data);
          if(data.status){
            setAuthOtp(true);
            TriggerNotification({
              type: "success",
              message: data.msg,
              duration: 5000,
            });
            navigate(`/otp-verification/${data.id}/forgot`);
          }
        }
        catch(err){
            TriggerNotification({
                type: "error",
                message: "Something went wrong. Please try again.",
                duration: 5000,
            });
            console.log(err);
        }
    }
  return (
    <div className="text-white text-center  flex flex-col items-center justify-center h-[80vh] max-w-md mx-auto">
    {isLoading && <Loading />}
      <div className=" border border-white/20 bg-[#060607] rounded-lg p-10 flex flex-col z-50 ">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-lg mb-5">Enter your email address to reset your password.</p>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button onClick={handleSubmit}>Verify</Button>
      </div>
    </div>
  )
}

export default ForgotPassMailPage