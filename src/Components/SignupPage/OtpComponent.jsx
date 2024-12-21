import React, { useRef, useState } from 'react';
import Input from '../UI/Input';

const OtpComponent = ({ length, onOtp, className }) => {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(Array(length).fill("")); // Initialize state to store OTP


  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value; // Update the current digit
      setOtp(updatedOtp); // Update state
      onOtp(updatedOtp.join("")); // Send the OTP to the parent component

      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1].focus(); // Move to the next field
      }
    } else {
      e.target.value = ""; // Clear invalid input
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "") {
      if (index > 0) {
        inputsRef.current[index - 1].focus(); // Move to the previous field
      }

      const updatedOtp = [...otp];
      updatedOtp[index] = ""; // Clear the current digit
      setOtp(updatedOtp); // Update state
      onOtp(updatedOtp.join("")); // Send the updated OTP to the parent component
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").slice(0, length); // Allow up to the specified length
    const digits = pastedData.match(/\d/g); // Extract digits
    if (digits) {
      const updatedOtp = [...otp];
      digits.forEach((digit, idx) => {
        if (idx < length) {
          updatedOtp[idx] = digit;
          if (inputsRef.current[idx]) {
            inputsRef.current[idx].value = digit;
          }
        }
      });

      setOtp(updatedOtp); // Update state
      onOtp(updatedOtp.join("")); // Send the OTP to the parent component
      const nextIndex = Math.min(digits.length, inputsRef.current.length - 1);
      inputsRef.current[nextIndex]?.focus(); // Focus the next field after pasting
    }
    e.preventDefault();
  };

  return (
    <div
      className="flex gap-2 p-2 mx-auto"
      onPaste={handlePaste} // Handle paste for quick entry
    >
      {Array.from({ length: length }, (_, index) => (
        <Input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)} // Store refs
          type="number"
          maxLength="1"
          className='w-12 h-12 text-center'
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default OtpComponent;
