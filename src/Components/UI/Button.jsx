import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = ({ variant = 'primary', to, children, className, ...props }) => {
  const baseStyles =
    'px-4 py-2 rounded-full font-medium transition duration-300';

  const variants = {
    primary: 'bg-secondary text-primary hover:bg-primary hover:text-secondary border border-2 hover:border-accent',
    secondary: 'border border-2 border-accent text-secondary hover:bg-accent hover:text-primary',
    destructive: 'bg-red-500 text-primary hover:bg_error',
    simple: 'bg-transparent text-secondary hover:bg-accent hover:text-primary',
    small_primary: 'px-2 py-1 text-sm bg-secondary text-primary hover:bg-primary hover:text-secondary border border-2 hover:border-accent',
    small_secondary: 'px-2 py-1 text-sm border border-2 border-accent text-secondary hover:bg-accent hover:text-primary',
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;
  // If 'to' prop exists, render a Link instead of button
  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

// Button.propTypes = {
//   variant: PropTypes.oneOf(['primary', 'secondary']),
//   to: PropTypes.string, // Optional route path
//   children: PropTypes.node.isRequired,
//   className: PropTypes.string,
// };

export default Button;
