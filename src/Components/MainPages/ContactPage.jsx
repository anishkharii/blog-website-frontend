import React, { useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

const ContactPage = () => {

    const [formData, setFormData] = useState({
      title: "",
      email: "",
      message: "",
    })
    function handleChange(e) {
      let name = e.target.name;
      let value = e.target.value;

      setFormData({
        ...formData,
        [name]: value,
      });
    }
    function handleSubmit(e) {
      e.preventDefault();
      console.log(formData);
    }
  return (
    <div className="text-white flex flex-col items-center justify-center h-[80vh]">
    <div className="flex flex-col z-50 items-center justify-center">

      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="text-lg mb-5"> For any queries, please contact us at:</p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center px-3 py-5 border border-white/20 bg-[#060607] rounded-md">
       
          <Input
            type="text"
            name="title"
            label="Title"
            placeholder="Your Title"
            className=' w-[320px]'
            onChange={handleChange}
            required
          />

          <Input
            type="email"
            name="email"
            label="Email"
            className='w-[320px]'
            placeholder="Your Email"
            onChange={handleChange}
            required
          />

        <div className="flex flex-col px-2 text-left">
          <label htmlFor="message">Message</label>
          <textarea
            className=" py-1 px-2 rounded-md w-80  bg-transparent border border-white/20  "
            id="message"
            name="message"
            rows="4"
            placeholder="Enter your message here"
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>

      <p className="text-sm text-white/20 mt-5 "> Please maintain a respectful tone in your communication.</p>
    </div>
    </div>
  );
};

export default ContactPage;
