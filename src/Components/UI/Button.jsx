const Button = ({ children, className = "", variant = "default", ...props }) => {
  // Define variant-specific styles
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2 h-9 m-2 shadow transition-colors whitespace-nowrap";

  const variantStyles = {
    outline: "bg-transparent border border-white/40 hover:bg-[#3c3c3f] hover:border-none text-white",
    default: "bg-white hover:bg-white/90 text-black",
    destructive: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.default} ${className}`.trim()}
    >
      {children}
    </button>
  );
};

export default Button;
