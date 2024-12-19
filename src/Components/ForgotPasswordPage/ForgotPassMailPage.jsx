import React, { useState } from 'react'
import Background from '../LoginPage/Background'
import Button from '../UI/Button'
import Input from '../UI/Input'

const ForgotPassMailPage = () => {
    const [email, setEmail] =  useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
  return (
    <div className="text-white text-center  flex flex-col items-center justify-center h-[80vh] max-w-md mx-auto">
      <Background top={-100} left={-100} />
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