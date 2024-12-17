import React from "react";

 import "./Notification.css";
import { Check, CircleAlert, CircleX, Info, X } from "lucide-react";
const Notification = ({ type = "info", message, onClose = () => {} }) => {
  const iconStyle = {
    fontSize: "20px",
    color: "#fff9f9",
    marginRight: "15px",
  };

  const icons = [
    {type:"info", icon: <Info style={iconStyle} />, color: "#0d96c0"},
    {type:"warning", icon: <CircleAlert style={iconStyle} />, color: "#d4a11f"},
    {type:"error", icon: <CircleX style={iconStyle} />, color: "#c82727"},
    {type:"success", icon: <Check style={iconStyle} />, color: "#22c55e"},
  ];
  const color = icons.filter(item=>item.type===type)[0].color;
  
  return (
    <>
      <div className={`text-white flex items-center justify-between p-4 gap-4 rounded-md z-50  notification-pop-up `} style={{background:color}}>
        {/*Icons*/}
        {icons.map((item, i) => item.type===type && <span key={i}>{item.icon}</span>)}

        {/*Message*/}
        <p className="text-md font-semibold ">{message}</p>
        {/*close button*/}
        <X onClick={onClose} className="close-btn" />
        {/* <div className="notification-bottom-loader"></div> */}
      </div>
      
    </>
  );
};

export default Notification;
