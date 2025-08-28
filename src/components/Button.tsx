import React, { type FC } from 'react';

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({ children, onClick, disabled = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className="btn border-gray-300 bg-white hover:bg-gray-50"
    >
      {children}
    </button>
  );
};

export default Button;
