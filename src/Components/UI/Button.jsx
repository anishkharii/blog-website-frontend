const Button = ({ children, className, variant, ...props }) => {
 
  return (
    <button
      {...props}
      className={` ${className} inline-flex items-center justify-center rounded-md text-sm font-medium 
      ${
        variant === "outline"
          ? "bg-transparent border border-white/40 hover:bg-[#3c3c3f] hover:border-none hover:px-[17px] hover:py-[9px] text-white"
          : "bg-white hover:bg-white/90 text-black"
      } px-4 py-2 h-9 m-2  shadow transition-colors  whitespace-nowrap
      ${
        variant === "destructive"
        ? "bg-red-500 hover:bg-red-600 text-white"
        : ""
      }
      `}
    >
      {children}
    </button>
  );
};

export default Button;
